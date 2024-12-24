import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestore } from '../Authen/firebase';

export const Aview = () => {

    const [search, setSearch] = useState("");
    const [leaveRequests, setLeaveRequests] = useState([]);


    // useEffect(() => {



    const fetchLeaveRequests = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'attend'));
            const leaveRequestsData = querySnapshot.docs.map(doc => doc.data());
            setLeaveRequests(leaveRequestsData);
        } catch (error) {
            console.error('Error fetching leave requests:', error);
        }
    };
    // return () => unsubscribe();
    //     fetchLeaveRequests();

    // }, [])

    // Call fetchLeaveRequests function inside useEffect to fetch leave requests when component mounts
    useEffect(() => {
        fetchLeaveRequests();
    }, []); // Empty dependency array indicates that this effect runs only once, after initial render

    return (
        <>


            <div className='container'>
                <div className="mb-3 my-4">
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder='Search here...' onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>

            <div className='container my-4'>
                <h2>All Attendance</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveRequests
                            .filter((request) => {
                                return search.toLowerCase() === ""
                                    ? request
                                    :
                                    (
                                        request.user?.toLowerCase().includes(search) || request.date?.toLowerCase().includes(search)
                                    )
                            })

                            .map((request, index) => (
                                <tr key={index}>
                                    <td>{request.user}</td>
                                    <td>{request.date}</td>
                                    <td>{request.status}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
