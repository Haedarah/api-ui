import React, { useState } from 'react';
import TuskerLogo from '../logos/Tusker-Logo.png';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import ShortPointsDisplay from './ShortPointsDisplay';

const TuskerSection: React.FC = () => {
    const [phone, setPhone] = useState("");
    const [response, setResponse] = useState<any>(null);
    const API_URL = process.env.REACT_APP_API_URL;
    const API_KEY = process.env.REACT_APP_TUSKER_API_KEY;

    const handleSubmit = async () => {
        try {
            const res = await fetch(`${API_URL}/Company1/api/points_details?phone=${encodeURIComponent(phone)}`, {
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
                src={TuskerLogo}
                alt="Tusker Logo"
                className="mx-auto mt-4 mb-6"
                style={{ width: '150px', height: 'auto' }}
            />
            <p style={{ color: 'black', maxWidth: '900px', margin: '0 auto', fontFamily: 'Garamond', fontSize: '24px', textAlign: 'center', paddingLeft: '120px', paddingRight: '120px' }}>
                A leading provider of salary sacrifice car schemes in the UK, enabling businesses to offer employees tax-efficient vehicle options
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

                <ShortPointsDisplay response={response} value={phone} apiUrl={`${API_URL}`} apiKey={`${API_KEY}`} company={"Company1"} param={"phone"} />

            </div>
        </div>
    );
};

export default TuskerSection;
