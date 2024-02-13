# Airwallex Beneficary Component with React Typescript 

This directory contains the React and Typescript implementation of the [Airwallex Embedded Beneficary Component](https://www.airwallex.com/docs/payouts__embedded-beneficiary-component). 

## Requirements

- [node.js](https://nodejs.org/en/)
- npm package manager

## Installation and Development

1. Clone the root [airwallex-beneficiary-component-demo](https://github.com/isacben/airwallex-beneficary-component-demo) project to your local machine:

```git clone https://github.com/airwallex/airwallex-payment-demo```

2. Navigate into the react directory with `cd react`

3. Install the package with `npm install`

4. Copy the contents of `.env.example` into a `.env` file by running `cp .env.example .env`

5. Run the project in development mode with `npm run dev`. See the project at localhost:3000

## Configuration

You must change your application CLIENT_ID in the `.env` file.

Your CLIENT_ID can be found on the Airwallex Webapp Platform under Account Settings > Developer. Do not share this information because it may allow access to your account.

## Usage

The embedded beneficiary component is written in the `src/components` folder.
