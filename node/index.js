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
            scope: ["w:awx_action:transfers_edit"]
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
    const codeChallenge = req.params.code;

    const token = await getToken();
    const authorizationCode = await authAccount(codeChallenge, token);

    res.json({"authorization_code": authorizationCode});
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

