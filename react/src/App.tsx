import viteLogo from '/vite.svg'
import './index.css'
import BeneficiaryForm from './components/BeneficiaryForm';

function App() {
    return (
        <div className="container max-w-3xl mx-auto my-10">
            <h1 className="text-gray-700 text-4xl font-extrabold">Beneficiary Component
            <span className="bg-violet-100 text-violet-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded ms-2">Demo</span></h1>
            <BeneficiaryForm />
        </div>
    );
}

export default App;
