import React, { useState } from 'react';
import DeciwoodLogo from '../logos/Deciwood.png';

import ShortPointsDisplay from './ShortPointsDisplay';

const DeciwoodSection: React.FC = () => {
    const [email, setEmail] = useState("");
    const [response, setResponse] = useState<any>(null);
    const API_URL = process.env.REACT_APP_API_URL;
    const API_KEY = process.env.REACT_APP_DECIWOOD_API_KEY;

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
                src={DeciwoodLogo}
                alt="Deciwood Logo"
                className="mx-auto"
                style={{ width: '150px', height: 'auto' }}
            />
            <p style={{ color: 'black', maxWidth: '800px', margin: '0 auto', fontFamily: 'Garamond', fontSize: '24px', textAlign: 'center', paddingLeft: '120px', paddingRight: '120px' }}>
                The only Indian brand that crafts Bluetooth speakers from wood
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

export default DeciwoodSection;
