require('dotenv').config();
const config = require('./config');
const axios = require('axios')

const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

let cachedToken = '';
const getToken = async () => {
  try {
      if (cachedToken) {
        return cachedToken;
      }
      console.log("Requesting authentication token...");
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


app.get("/", async (req, res) => {
    const token = await getToken();
    console.log(token);

    res.render("index");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

