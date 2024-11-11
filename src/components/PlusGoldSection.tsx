import React, { useState } from 'react';
import PlusGoldLogo from '../logos/PlusGold.png';

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
            <p style={{ color: 'black', width: '550px', fontFamily: "Garamond", fontSize: '24px' }}>
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
                {response && response.error && (
                    <p className="mt-5 text-red-600 text-lg font-semibold">You are not a member of the company</p>
                )}
                {response && response.total_points === 0 && (
                    <p className="mt-5 text-blue-600 text-lg font-semibold">
                        You don't have points in this company. Get some by shopping!
                    </p>
                )}
                {response && response.total_points > 0 && (
                    <div className="mt-10 flex flex-col items-center space-y-5 mb-12">

                        <div className="bg-blue-100 text-blue-700 p-5 rounded-lg text-xl font-bold shadow-md">
                            Total Points: {Math.round(response.total_points * 100) / 100}
                        </div>

                        <div className="w-full overflow-x-auto max-w-lg rounded-lg shadow-lg mt-6">
                            <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                                        <th className="py-3 px-20 text-left font-semibold">Points</th>
                                        <th className="py-3 px-20 text-left font-semibold">Expiry Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {response.points.map((point: any, index: number) => (
                                        <tr
                                            key={index}
                                            className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                                } hover:bg-blue-50 transition duration-150`}
                                        >
                                            <td className="py-4 px-6 text-gray-800 font-medium">{Math.round(point.points * 100) / 100}</td>
                                            <td className="py-4 px-6 text-gray-800">{new Date(point.expiry).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlusGoldSection;
