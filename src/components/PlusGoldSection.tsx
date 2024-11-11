import React, { useState } from 'react';
import PlusGoldLogo from '../logos/PlusGold.png';

import ShortPointsDisplay from './ShortPointsDisplay';

const PlusGoldSection: React.FC = () => {
    const [email, setEmail] = useState("");
    const [response, setResponse] = useState<any>(null);
    const API_URL = process.env.REACT_APP_API_URL;
    const API_KEY = process.env.REACT_APP_PLUS_GOLD_API_KEY;

    const handleSubmit = async () => {
        try {
            const res = await fetch(`${API_URL}/Company4/api/points_details?email=${email}`, {
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
                src={PlusGoldLogo}
                alt="PlusGold Logo"
                className="mx-auto m-5"
                style={{ width: '150px', height: 'auto' }}
            />
            <p style={{ color: 'black', width: '1000px', paddingLeft: '300px', paddingRight: '300px', fontFamily: "Garamond", fontSize: '24px' }}>
                A revolutionary app that makes investing in gold hassle-free and rewarding
            </p>
            <div className="mt-10 flex flex-col items-center">
                <p style={{ color: 'black', fontFamily: "Lato", fontSize: '28px' }}>
                    Login
                </p>
                <p style={{ color: 'black', fontFamily: "Garamond", fontSize: '18px', marginBottom: '15px', marginTop: '15px' }}>
                    Check your loyalty points here:
                </p>
                <p style={{ color: 'black', fontFamily: "Garamond", fontSize: '16px' }}>
                    Email Address:
                </p>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 w-64 rounded-md text-black"
                />

                <button
                    onClick={handleSubmit}
                    className="mt-2 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>

                <ShortPointsDisplay response={response} value={email} apiUrl={`${API_URL}`} apiKey={`${API_KEY}`} company={"Company4"} param={"email"} />

            </div>
        </div>
    );
};

export default PlusGoldSection;
