import React, { useState } from 'react';

interface NavbarProps {
    onSelectCompany: (company: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSelectCompany }) => {
    const [clickedCompany, setClickedCompany] = useState<string | null>("SanFe");

    const companies = [
        { name: 'SanFe', hoverColor: 'bg-SanFe-500' },
        { name: 'Eat Better Co', hoverColor: 'bg-EatBetterCo-500' },
        { name: 'Country Bean', hoverColor: 'bg-CountryBean-500' },
        { name: 'PlusGold', hoverColor: 'bg-PlusGold-500' }
    ];

    const handleClick = (company: string) => {
        setClickedCompany(company);
        onSelectCompany(company);
    };

    return (
        <nav className="bg-gray-800 p-6 flex justify-center space-x-4">
            {companies.map((company) => (
                <button
                    key={company.name}
                    onClick={() => handleClick(company.name)}
                    className={`text-white py-3 rounded transform transition-all duration-200 
                    ${clickedCompany === company.name ? `px-20 ${company.hoverColor}` : `px-4 hover:${company.hoverColor} opacity:20`}`}
                >
                    {company.name}
                </button>
            ))}
        </nav>
    );
};

export default Navbar;
