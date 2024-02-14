
import { useState, useEffect } from 'react';
import BeneficiaryForm from './BeneficiaryForm';

function FormContainer() {

    const theme0 = {}; 
    const theme1 = {"components":{"textInput":{"colors":{"border":{"focus":"#61ff2f"}}},"select":{"colors":{"control":{"focus":"#50e3c2","initial":"#6cc328"}}}}};

    const [options, setOptions] = useState({theme: theme0});

    return (
        <>
            <div className="mt-10 flex justify-start">
                <button className="mr-1 rounded-full h-5 w-5 bg-violet-800" onClick={() =>
                    setOptions({theme: theme0})
                }></button>
                <button id="theme1" className="rounded-full h-5 w-5 bg-orange-400" onClick={() =>
                    setOptions({theme: theme1})
                }></button>
            </div>
            <BeneficiaryForm options={options} />
        </>
    )
}

export default FormContainer;
