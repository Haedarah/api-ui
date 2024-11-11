import React, { useState } from 'react';
import EatBetterCoLogo from '../logos/eatbetterco.svg';

import ShortPointsDisplay from './ShortPointsDisplay';

const EatBetterCoSection: React.FC = () => {
    const [email, setEmail] = useState("");
    const [response, setResponse] = useState<any>(null);
    const API_URL = process.env.REACT_APP_API_URL;
    const API_KEY = process.env.REACT_APP_EAT_BETTER_CO_API_KEY;

    const handleSubmit = async () => {
        try {
            const res = await fetch(`${API_URL}/Company2/api/points_details?email=${email}`, {
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
                src={EatBetterCoLogo}
                alt="eatBetterCo Logo"
                className="mx-auto mt-5 mb-1"
                style={{ width: '150px', height: 'auto' }}
            />
            <p style={{ color: 'black', width: '1000px', paddingLeft: '280px', paddingRight: '280px', fontFamily: "Garamond", fontSize: '24px' }}>
                Only the best of ingredients, carefully selected, make their way into our snacks
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

                <ShortPointsDisplay response={response} value={email} apiUrl={`${API_URL}`} apiKey={`${API_KEY}`} company={"Company2"} param={"email"} />

            </div>
        </div>
    );
};

export default EatBetterCoSection;
