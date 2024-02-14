
import ColorSelector from './ColorSelector';
import axios from 'axios';
import { Base64 } from 'js-base64';
import { init, createElement } from '@airwallex/payouts-web-sdk';

import { useState, useEffect } from 'react';

function BeneficiaryForm({ options }) {

    const clientId = import.meta.env.VITE_AIRWALLEX_CLIENT_ID;

    let ready = false;

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

    // Handle form events
    const handleReady: Handler = () => {
        ready = true;
    }
   
    const [output, setOutput] = useState("");
    const [op, setOp] = useState(options);

    useEffect(() => { 
        setOp(options);

        async function getAuthorizationCode() {
            const codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier);

            const url = `http://127.0.0.1:5000/auth/${codeChallenge}`;

            const response = await axios.get(url);

            const authorizationCode = response.data.authorization_code;

            await init({
              langKey: 'en',
              env: 'demo',
              authCode: authorizationCode,
              clientId: clientId,
              codeVerifier: codeVerifier,
            });

            const beneficiaryComponent = createElement('beneficiaryForm', options);

            beneficiaryComponent.mount('#beneficiary-form-container');

            beneficiaryComponent.on('ready', () => {
                handleReady();
            });

            document.getElementById('submit-button').addEventListener('click', async () => {
                if (ready) {
                    const formResult = await beneficiaryComponent.submit();
                    setOutput(formResult);
                    console.log(formResult);
                }
            });
        }
        getAuthorizationCode();
    }, [options]);

    return (
        <>

            <div id="beneficiary-form-container" className="mt-4 mb-5 border-dashed border-gray-200 border-4 p-6"/>
            <div className="flex justify-end">
                <button id="submit-button" type="button" className="text-white bg-violet-800 hover:bg-violet-600 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-6 focus:outline-none">Submit to see payload</button>
            </div>
            <div className="border-solid border-gray-300 border rounded-md bg-slate-100 p-6 text-sm text-slate-500 min-h-96">
                { !!output && 
                    <pre>
                        { JSON.stringify(output, null, 2) }
                    </pre>
                }
            </div>
        </>
    );
}

export default BeneficiaryForm;
