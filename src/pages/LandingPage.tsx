import React, { useState } from 'react';

import Navbar from '../components/Navbar';

import SanFeSection from '../components/SanFeSection';
import EatBetterCoSection from '../components/EatBetterCoSection';
import CountryBeanSection from '../components/CountryBeanSection';
import PlusGoldSection from '../components/PlusGoldSection';



const LandingPage: React.FC = () => {
    const [selectedCompany, setSelectedCompany] = useState<string | null>('SanFe'); //Default to 'SanFe'

    const handleSelectCompany = (company: string) => {
        setSelectedCompany(company);
    };

    const getBackgroundColor = () => {
        if (selectedCompany === 'SanFe') return 'bg-SanFe-500 bg-opacity-20';
        else if (selectedCompany === 'Eat Better Co') return 'bg-EatBetterCo-500 bg-opacity-20';
        else if (selectedCompany === 'Country Bean') return 'bg-CountryBean-500 bg-opacity-20';
        else if (selectedCompany === 'PlusGold') return 'bg-PlusGold-500 bg-opacity-20';
    };

    return (
        <div className={`min-h-screen ${getBackgroundColor()} transition-all duration-300 pb-10`}>
            <Navbar onSelectCompany={handleSelectCompany} />

            <div className="flex justify-center items-center h-full text-white">
                {selectedCompany === 'SanFe' && <SanFeSection />}
                {selectedCompany === 'Eat Better Co' && <EatBetterCoSection />}
                {selectedCompany === 'Country Bean' && <CountryBeanSection />}
                {selectedCompany === 'PlusGold' && <PlusGoldSection />}
            </div>
        </div>
    );
};

export default LandingPage;
