require('dotenv').config();
const config = require('./config');
const axios = require('axios')
const Base64 = require("js-base64");
const express = require("express");
const sdk = require("@airwallex/payouts-web-sdk");

const app = express();
const port = 5000;

app.set("view engine", "ejs");

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

// Generate code_verifier
const dec2hex = (dec) => {
  return ('0' + dec.toString(16)).slice(-2);
};

const generateCodeVerifier = () => {
  // generate random length for code_verifier which should be between 43 and 128
  const length = Math.random() * (129-43) + 43;   
  const array = new Uint32Array(length/2);
  crypto.getRandomValues(array);

  return Array.from(array, dec2hex).join('');
};

const codeVerifier = generateCodeVerifier();

// Generate code_challenge
const sha256 = (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest('SHA-256', data);
};

const base64urlencode = (hashed) => {
  const bytes = new Uint8Array(hashed);
  const base64encoded = Base64.fromUint8Array(bytes, true);
  return base64encoded;
};

const generateCodeChallengeFromVerifier = async (codeVerifier) => {
  const hashed = await sha256(codeVerifier);
  const base64encoded = base64urlencode(hashed);
  return base64encoded;
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

