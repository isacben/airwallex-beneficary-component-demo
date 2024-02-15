
import { useState, useEffect } from 'react';
import BeneficiaryForm from './BeneficiaryForm';

function FormContainer() {

    const theme0 = {}; 
    const theme1 = {"components":{},"palette":{"primary":{"10":"#ffefe2","20":"#ffe2c8","30":"#ffd4af","40":"#ffc795","50":"#ffb97c","60":"#ffac62","70":"#ff912f","80":"#c85e00","90":"#954600","100":"#622e00"},"success":{"10":"#fff","30":"#f7fdf2","50":"#def5c7","70":"#b8e986","90":"#6cb521"},"secondary":{"10":"#dcb18b","30":"#d09664","50":"#c47c3d","70":"#8b572a","90":"#160d06"},"error":{"10":"#fbdbda","30":"#f7aeab","50":"#f3817d","70":"#ec3d37","90":"#7e100c"},"warning":{"10":"#fdf9c9","30":"#fcf498","50":"#faef66","70":"#f8e71c","90":"#776e04"}}}
    const theme2 = {"palette":{"primary":{"10":"#e2eaff","20":"#c8d7ff","30":"#afc5ff","40":"#95b3ff","50":"#7ca0ff","60":"#628eff","70":"#2f69ff","80":"#0038c8","90":"#002a95","100":"#001b62"},"secondary":{"10":"#fee4c4","30":"#fdcc92","50":"#fcb560","70":"#fb9215","90":"#754102"},"success":{"10":"#94fbb8","30":"#62f998","50":"#31f777","70":"#08d450","90":"#024118"},"warning":{"10":"#fef2b2","30":"#fde980","50":"#fde04e","70":"#fbd203","90":"#645401"}}}
    const theme3 = {"palette":{"primary":{"10":"#ffe2ff","20":"#ffc8fe","30":"#ffaffe","40":"#ff95fe","50":"#ff7cfe","60":"#ff62fd","70":"#ff2ffd","80":"#c800c6","90":"#950094","100":"#620061"},"secondary":{"10":"#dfb3ff","30":"#ca80ff","50":"#b54dff","70":"#9500ff","90":"#3c0066"},"success":{"10":"#eafcf8","30":"#bef5e8","50":"#92eed9","70":"#50e3c2","90":"#15856c"},"warning":{"10":"#fbfeb2","30":"#f8fd80","50":"#f6fd4e","70":"#f1fb03","90":"#606401"},"error":{"10":"#ffb5b3","30":"#ff8380","50":"#ff514d","70":"#ff0700","90":"#660300"}}} 

    const [options, setOptions] = useState({theme: theme0});

    return (
        <>
            <div className="mt-10 flex justify-start">
                <button id="theme0" className="mr-1 rounded-full h-5 w-5 bg-violet-800" onClick={() =>
                    setOptions({theme: theme0})
                }></button>
                <button id="theme1" className="mr-1 rounded-full h-5 w-5 bg-orange-400" onClick={() =>
                    setOptions({theme: theme1})
                }></button>
                <button id="theme2" className="mr-1 rounded-full h-5 w-5 bg-blue-400" onClick={() =>
                    setOptions({theme: theme2})
                }></button>
                <button id="theme3" className="rounded-full h-5 w-5 bg-pink-500" onClick={() =>
                    setOptions({theme: theme3})
                }></button>
            </div>
            <BeneficiaryForm options={options} />
        </>
    )
}

export default FormContainer;
