import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthNames = [
    { month: 1, name: 'Jan' },
    { month: 2, name: 'Feb' },
    { month: 3, name: 'Mar' },
    { month: 4, name: 'Apr' },
    { month: 5, name: 'May' },
    { month: 6, name: 'Jun' },
    { month: 7, name: 'Jul' },
    { month: 8, name: 'Aug' },
    { month: 9, name: 'Sep' },
    { month: 10, name: 'Oct' },
    { month: 11, name: 'Nov' },
    { month: 12, name: 'Dec' }
];

const boldTextStyle = { fontWeight: 'bold' };

const ReservationChart = ({ data }) => {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: 800, height: 500, backgroundColor: 'white', borderRadius: '8px', marginTop: '20px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <XAxis
                            dataKey="month"
                            tickFormatter={(month) => monthNames.find(m => m.month === month).name} // Convert month number to month name
                            tick={{ style: boldTextStyle }}
                        />
                        <YAxis
                            tick={{ style: boldTextStyle }}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="reservations" fill="#04579B" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ReservationChart;
