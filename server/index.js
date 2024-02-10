require('dotenv').config();
const config = require('./config');
const express = require('express');
const cors = require('cors');
const axios = require('axios')
const Base64 = require("js-base64");

const port = 5000;

const app = express();
app.use(cors());

let cachedToken = '';
const getToken = async () => {
  try {
      if (cachedToken) {
        return cachedToken;
      }
      const loginUrl = `${config.airwallex.clientApiHost}/api/v1/authentication/login`;
      const loginHeader = {
        'x-client-id': config.airwallex.clientId,
        'x-api-key': config.airwallex.apiKey,
        'Content-Type': 'application/json'
      };
      const loginRes = await axios.post(
        loginUrl,
        {},
        {
          headers: loginHeader,
        },
      );
      const token = loginRes.data.token;
      cachedToken = token;
      // Cache token for a while
      setTimeout(() => (cachedToken = ''), 20 * 60 * 1000);
      return token;
  } catch (error) {
        console.error("Error generating request options");
        throw error;
    }
};

const authAccount = async (codeChallange, token) => {
  try {
      const url = `${config.airwallex.clientApiHost}/api/v1/authentication/authorize`;
      const loginHeader = {
        'x-client-id': config.airwallex.clientId,
        'x-api-key': config.airwallex.apiKey,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.post(
        url,
        {
            code_challenge: codeChallange,
            scope: ["w:awx_action:onboarding"]
        },
        {
          headers: loginHeader,
        },
      );
      return response.data.authorization_code;
  } catch (error) {
        console.error("Error generating request options");
        throw error;
    }
};

app.get("/auth/:code", async (req, res) => {
    console.log("code_challenge:", req.params.code);
    res.json({"status": "Running..."});
});

app.get("/", async (req, res) => {
    const token = await getToken();

    const codeChallange = await generateCodeChallengeFromVerifier(codeVerifier);
    const authorizationCode = await authAccount(codeChallange, token);
    console.log("Code verifier:", codeVerifier);
    console.log("Authorization Code:", authorizationCode);

    res.render("index");
    try {
    await sdk.init({
      langKey: 'en',
      env: 'demo',
      authCode: authorizationCode, 
      clientId: config.airwallex.clientId,
      codeVerifier: codeVerifier,
    });
    }
    catch(error) {
        console.log(error);
    }

    const beneficiaryComponentlement = sdk.createElement('beneficiaryForm');
    beneficiaryComponentlement.mount('#beneficiary-form-container');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

