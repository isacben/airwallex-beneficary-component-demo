# Airwallex Beneficary Component Demo - Node Server

This directory contains a simple example of a Node server integrated with the [Airwallex Beneficary Component API](https://www.airwallex.com/docs/payouts__embedded-beneficiary-componen). The server demonstrates how to use the API to request the authorization code required to mount the embedded component in the frontend.

## Prerequisites

- [node.js](https://nodejs.org/en/)
- npm package manager

## Installation and Development

1. Clone the root [airwallex-beneficiary-component-demo](https://github.com/isacben/airwallex-beneficary-component-demo) project to your local machine:

```git clone https://github.com/airwallex/airwallex-payment-demo```

2. Navigate into the node directory with `cd node`

3. Install the package with `npm install`

4. Copy the contents of `.env.example` into a `.env` file by running `cp .env.eample .env`

5. Run the project in development mode with `npm start`. See the project at localhost:5000

## Configuration

You must change your application keys in the `.env` file.

Your CLIENT_ID and API_KEY can be found on the Airwallex Webapp Platform under Account Settings > Developer. Do not share these keys because they allow access to your account.

## Usage

For demo purposes, the auth routes below can be accessed with a GET request. Be sure to change it to a POST request in production to protect your acount details.

- Get authorization code with http://localhost:3002/api/v1/intent/create

Find more details about the Airwallex API [here](https://www.airwallex.com/docs/api#/Scale/Embedded_Components/_api_v1_account_authorize/post)!
