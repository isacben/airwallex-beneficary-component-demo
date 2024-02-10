
import axios from 'axios';
import { Base64 } from 'js-base64';
import { init} from '@airwallex/payouts-web-sdk';

import { useState, useEffect } from 'react';

function BeneficiaryForm() {

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
    const sha256 = (plain: string) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    };

    const base64urlencode = (hashed: ArrayBuffer) => {
        const bytes = new Uint8Array(hashed);
        const base64encoded = Base64.fromUint8Array(bytes, true);
        return base64encoded;
    };

    const generateCodeChallengeFromVerifier = async (codeVerifier: string) => {
        const hashed = await sha256(codeVerifier);
        const base64encoded = base64urlencode(hashed);
        return base64encoded;
    };

    const [authorizationCode, setAuthorizationCode] = useState('');

    useEffect(() => { 
        async function getAuthorizationCode() {
            const codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier);

            const url = `http://127.0.0.1:5000/auth/${codeChallenge}`;

            const response = await axios.get(url);
            setAuthorizationCode(response.status);
        }
        getAuthorizationCode();
    }, []);

    
    return <div id="beneficiary-form-container">{authorizationCode}</div>;
}

export default BeneficiaryForm;
