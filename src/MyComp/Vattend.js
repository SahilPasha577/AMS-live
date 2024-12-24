import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestore } from '../Authen/firebase';




export const Vattend = () => {

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
            {/* <Link onClick={fetchLeaveRequests} type="button" className="btn btn-success m-4">View Attend</Link> */}





            <div className='container my-4'>
                {leaveRequests.map((request, index) => (
                    <>

                        <li key={index}>
                            User: {request.user}, Status: {request.status}
                            Date: {request.date}

                        </li>

                    </>
                ))}
            </div>
        </>
    )
}

