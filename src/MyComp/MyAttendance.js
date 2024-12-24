import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firestore } from '../Authen/firebase';
import { useAuth } from '../Authen/useAuth';

export const MyAttendance = () => {

    const { currentUser } = useAuth();
    const [userAttendance, setUserAttendance] = useState([]);

    useEffect(() => {
        const fetchUserAttendance = async () => {
            try {
                const q = query(
                    collection(firestore, 'attend'),
                    where('userId', '==', currentUser.userId), orderBy("markedAt")
                );
                const querySnapshot = await getDocs(q);
                const attendanceData = querySnapshot.docs.map(doc => doc.data());
                setUserAttendance(attendanceData);
            } catch (error) {
                console.error('Error fetching user attendance:', error);
            }
        };

        fetchUserAttendance();
    }, [currentUser]);

    return (
        <>
            {/* <div>
                <h1>My Attendance</h1>
                <ul>
                    {userAttendance.map((attendance, index) => (
                        <li key={index}>
                            Date: {attendance.date}, Status: {attendance.status}
                        </li>
                    ))}
                </ul>
            </div> */}

            <div className='container my-4'>
                <h2>My Attendance</h2>
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th>User</th> */}
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userAttendance.map((attendance, index) => (
                            <tr key={index}>
                                <td>{attendance.date}</td>
                                {/* <td>{attendance.markedAt}</td> */}
                                <td>{attendance.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
