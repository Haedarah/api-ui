import React, { useState } from 'react';
import CountryBeanLogo from '../logos/CountryBean.png';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import ShortPointsDisplay from './ShortPointsDisplay';

const CountryBeanSection: React.FC = () => {
    const [phone, setPhone] = useState("");
    const [response, setResponse] = useState<any>(null);
    const API_URL = process.env.REACT_APP_API_URL;
    const API_KEY = process.env.REACT_APP_COUNTRY_BEAN_API_KEY;

    const handleSubmit = async () => {
        try {
            const res = await fetch(`${API_URL}/Company3/api/points_details?phone=${encodeURIComponent(phone)}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "api-key": `${API_KEY}`,
                },
            });

            const data = await res.json();
            setResponse(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div>
            <img
                src={CountryBeanLogo}
                alt="Country Bean Logo"
                className="mx-auto mt-5 mb-2"
                style={{ width: '300px', height: 'auto' }}
            />
            <p style={{ color: 'black', maxWidth: '800px', margin: '0 auto', fontFamily: 'Garamond', fontSize: '24px', textAlign: 'center', paddingLeft: '120px', paddingRight: '120px' }}>
                India's first flavoured coffee brand and one of the fastest growing direct-to-consumer startups in the country
            </p>
            <div className="mt-10 flex flex-col items-center">
                <p style={{ color: 'black', fontFamily: "Lato", fontSize: '28px' }}>
                    Login
                </p>
                <p style={{ color: 'black', fontFamily: "Garamond", fontSize: '18px', marginBottom: '15px', marginTop: '15px' }}>
                    Check your loyalty points here:
                </p>
                <p style={{ color: 'black', fontFamily: "Garamond", fontSize: '16px' }}>
                    Mobile Number:
                </p>

                <PhoneInput
                    name="phone"
                    defaultCountry="in"
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                    placeholder="Enter your phone number"
                    className="w-500 text-black"
                    required
                />

                <button
                    onClick={handleSubmit}
                    className="mt-2 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>

                <ShortPointsDisplay response={response} value={phone} apiUrl={`${API_URL}`} apiKey={`${API_KEY}`} company={"Company3"} param={"phone"} />

            </div>
        </div>
    );
};

export default CountryBeanSection;
