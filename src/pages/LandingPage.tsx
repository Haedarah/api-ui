import React, { useState } from 'react';

import Navbar from '../components/Navbar';

import TuskerSection from '../components/TuskerSection';
import BankOfScotlandSection from '../components/BankOfScotlandSection';
import CavendishOnlineSection from '../components/CavendishOnlineSection';
import LloydLivingSection from '../components/LloydLivingSection';
import NectarSection from '../components/NectarSection';
import HSBCSection from '../components/HsbcSection';


const LandingPage: React.FC = () => {
    const [selectedCompany, setSelectedCompany] = useState<string | null>('Tusker'); //Default to 'Tusker'

    const handleSelectCompany = (company: string) => {
        setSelectedCompany(company);
    };

    const getBackgroundColor = () => {
        if (selectedCompany === 'Tusker') return 'bg-Tusker-500 bg-opacity-20';
        else if (selectedCompany === 'Bank of Scotland') return 'bg-BankOfScotland-500 bg-opacity-20';
        else if (selectedCompany === 'Cavendish Online') return 'bg-CavendishOnline-500 bg-opacity-20';
        else if (selectedCompany === 'Lloyd Living') return 'bg-LloydLiving-500 bg-opacity-20';
        else if (selectedCompany === 'Nectar') return 'bg-Nectar-500 bg-opacity-20';
        else if (selectedCompany === 'HSBC') return 'bg-HSBC-500 bg-opacity-20';
    };

    return (
        <div className={`min-h-screen ${getBackgroundColor()} transition-all duration-300 pb-10`}>
            <Navbar onSelectCompany={handleSelectCompany} />

            <div className="flex justify-center items-center h-full text-white">
                {selectedCompany === 'Tusker' && <TuskerSection />}
                {selectedCompany === 'Bank of Scotland' && <BankOfScotlandSection />}
                {selectedCompany === 'Cavendish Online' && <CavendishOnlineSection />}
                {selectedCompany === 'Lloyd Living' && <LloydLivingSection />}
                {selectedCompany === 'Nectar' && <NectarSection />}
                {selectedCompany === 'HSBC' && <HSBCSection />}
            </div>
        </div>
    );
};

export default LandingPage;
