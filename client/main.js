import { init} from '@airwallex/payouts-web-sdk';

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
console.log(codeVerifier);
console.log("hello");
