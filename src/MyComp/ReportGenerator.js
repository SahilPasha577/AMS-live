import React, { useState } from 'react';
import { auth, firestore } from '../Authen/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const ReportGenerator = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [usersAttendance, setUsersAttendance] = useState([]);

    const generateReport = async () => {
        try {
            // Format the dates to match Firestore date format (DD-MM-YYYY)
            const formattedFromDate = fromDate.split('-').reverse().join('-');
            const formattedToDate = toDate.split('-').reverse().join('-');

            // Query Firestore using formatted dates
            const querySnapshot = await getDocs(
                query(collection(firestore, 'attend'),
                    where('markedAt', '>=', formattedFromDate),
                    where('markedAt', '<=', formattedToDate)
                )
            );

            // Extract data from query snapshot
            const usersData = [];
            querySnapshot.forEach(doc => {
                const data = doc.data();
                usersData.push(data);
            });

            // Update state with retrieved data
            setUsersAttendance(usersData);

            console.log('Report generated successfully:', usersData);
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };

    return (


        <>

            <div className='container my-4'>
                <h1>Generate Attendance Report</h1>
                <label htmlFor="fromDate" className='mx-2'> From Date </label>
                <input
                    className='mx-2'
                    type="date"
                    id="fromDate"
                    value={fromDate}
                    onChange={e => setFromDate(e.target.value)}
                />
                <label htmlFor="toDate" className='mx-2'>To Date</label>
                <input
                    className='mx-2'
                    type="date"
                    id="toDate"
                    value={toDate}
                    onChange={e => setToDate(e.target.value)}
                />
                <button className="btn btn-primary mx-2" onClick={generateReport}>
                    Generate Report
                </button>
                <h2 className='my-4'>Users Attendance</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersAttendance.map((attendance, index) => (
                            <tr key={index}>
                                <td>{attendance.user}</td>
                                <td>{attendance.markedAt}</td>
                                <td>{attendance.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

