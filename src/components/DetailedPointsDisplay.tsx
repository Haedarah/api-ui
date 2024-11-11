import React, { useEffect, useState } from 'react';

interface DetailedPointsDisplayProps {
    value: string;
    apiUrl: string;
    apiKey: string;
    company: string;
    param: string;
}

const DetailedPointsDisplay: React.FC<DetailedPointsDisplayProps> = ({ value, apiUrl, apiKey, company, param }) => {
    const [detailedData, setDetailedData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${apiUrl}/${company}/api/all_points?${param}=${param == "phone" ? encodeURIComponent(value) : value}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "api-key": apiKey,
                    },
                });
                const data = await res.json();
                setDetailedData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching details:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [value, apiUrl, apiKey]);

    if (loading) return <p className='text-black'>Loading details...</p>;

    if (!detailedData || detailedData.error) {
        return <p className="text-red-600 text-lg font-semibold">Failed to load details.</p>;
    }

    return (
        <div className="mt-5">
            <h2 className="text-black text-lg font-bold">Detailed Points</h2>
            <table className="bg-white border border-gray-300 rounded-lg overflow-hidden mt-3">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">

                        <th className="py-3 px-18 text-center font-semibold">Points</th>
                        <th className="py-3 px-18 text-center font-semibold">Current Points</th>
                        <th className="py-3 px-18 text-center font-semibold">Issuance</th>
                        <th className="py-3 px-18 text-center font-semibold">Expiry Date</th>
                        <th className="py-3 px-18 text-center font-semibold">Transaction ID</th>
                        <th className="py-3 px-18 text-center font-semibold">Deduction History</th>
                        <th className="py-3 px-18 text-center font-semibold">Status</th>

                    </tr>
                </thead>
                <tbody>
                    {detailedData.points.map((point: any, index: number) => {
                        const isExpired = new Date(point.expiry) < new Date();
                        const isPartiallyUsed = point.deduction_history && point.deduction_history.length > 0;
                        const isFullyActive = !isExpired && point.current_points === point.points;

                        let statusText = "-";
                        let statusColor = "";

                        if (isExpired) {
                            statusText = "Expired";
                            statusColor = "text-red-600 font-semibold";
                        } else if (isPartiallyUsed) {
                            statusText = "Active - Partially Used";
                            statusColor = "text-blue-600 font-semibold";
                        } else if (isFullyActive) {
                            statusText = "Active";
                            statusColor = "text-green-600 font-semibold";
                        }
                        else {
                            statusText = "-";
                            statusColor = "text-black font-semibold";
                        }

                        return (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-blue-50 transition duration-150`}>

                                <td className="py-4 px-6 text-gray-800 font-medium">
                                    {point.points ? Math.round(point.points * 100) / 100 : "-"}
                                </td>
                                <td className="py-4 px-6 text-gray-800">
                                    {point.current_points ? Math.round(point.current_points * 100) / 100 : "-"}
                                </td>
                                <td className="py-4 px-6 text-gray-800">
                                    {point.issuance ? new Date(point.issuance).toLocaleDateString() : "-"}
                                </td>
                                <td className="py-4 px-6 text-gray-800">
                                    {point.expiry ? new Date(point.expiry).toLocaleDateString() : "-"}
                                </td>
                                <td className="py-4 px-6 text-gray-800">
                                    {point.tx_id || "-"}
                                </td>
                                <td className="py-4 px-6 text-gray-800">
                                    {point.deduction_history && point.deduction_history.length > 0 ? (
                                        <ul>
                                            {point.deduction_history.map((deduction: any, idx: number) => (
                                                <li key={idx}>
                                                    <span className='text-rose-600'>-{deduction.amount || "-"}</span> from <span className='rounded bg-red-300'>{deduction.ref_tx_id || "-"}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td className={`py-4 px-6 ${statusColor}`}>
                                    {statusText}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DetailedPointsDisplay;