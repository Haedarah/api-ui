import React, { useState, useEffect } from 'react';
import DetailedPointsDisplay from './DetailedPointsDisplay';

interface PointsDisplayProps {
    response: any;
    value: string;
    apiUrl: string;
    apiKey: string;
    company: string;
    param: string;
}

const ShortPointsDisplay: React.FC<PointsDisplayProps> = ({ response, value, apiUrl, apiKey, company, param }) => {
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        setShowDetails(false);
    }, [value]);

    if (!response) return null;

    const toggleDetails = () => {
        setShowDetails(prev => !prev);
    };

    if (response.error) {
        return (
            <p className="mt-5 text-red-600 text-lg font-semibold">You are not a member of the company</p>
        );
    }

    if (response.total_points === 0) {
        return (
            <p className="mt-5 text-blue-600 text-lg font-semibold">
                You don't have points in this company. Get some by shopping!
            </p>
        );
    }

    return (
        <div className="mt-10 flex flex-col items-center space-y-5">
            <div className="bg-blue-100 text-blue-700 p-5 rounded-lg text-xl font-bold shadow-md">
                Total Points: {Math.round(response.total_points * 100) / 100}
            </div>

            <div className="rounded-lg shadow-lg mt-6">
                <table className="bg-white border border-gray-300 rounded-lg overflow-hidden">
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
                                <td className="py-4 px-6 text-gray-800 font-medium">
                                    {Math.round(point.points * 100) / 100}
                                </td>
                                <td className="py-4 px-6 text-gray-800">
                                    {new Date(point.expiry).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button
                onClick={toggleDetails}
                className="mt-2 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
            >
                {showDetails ? 'Hide details' : 'Show details'}
            </button>

            {showDetails && (
                <DetailedPointsDisplay value={value} apiUrl={apiUrl} apiKey={apiKey} company={company} param={param} />
            )}
        </div>
    );
};

export default ShortPointsDisplay;
