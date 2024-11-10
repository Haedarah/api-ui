import React, { useState } from 'react';
import EatBetterCoLogo from '../logos/eatbetterco.svg';

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
            <p style={{ color: 'black', width: '550px', fontFamily: "Garamond", fontSize: '24px' }}>
                Only the best of ingredients, carefully selected, make their way into our snacks
            </p>
            <div className="mt-10 flex flex-col items-center">
                <p style={{ color: 'black', fontFamily: "Garamond", fontSize: '16px' }}>
                    Query your points with your email address
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
                    className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>
                {response && response.error && (
                    <p className="mt-5 text-red-600 text-lg font-semibold">You are not a member of the company</p>
                )}
                {response && response.total_points === 0 && (
                    <p className="mt-5 text-blue-600 text-lg font-semibold">
                        You don't have points in this company. Get some by shopping!
                    </p>
                )}
                {response && response.total_points > 0 && (
                    <div className="mt-10 flex flex-col items-center space-y-5">

                        <div className="bg-blue-100 text-blue-700 p-5 rounded-lg text-xl font-bold">
                            Total Points: {response.total_points}
                        </div>

                        {response.points.map((point: any, index: number) => (
                            <div
                                key={index}
                                className="bg-gray-100 p-4 rounded-lg shadow-md text-black text-center w-auto"
                            >
                                <span className='px-14'>{point.points} points</span>
                                <span className='px-14'>Valid until: {new Date(point.expiry).toLocaleDateString()}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EatBetterCoSection;
