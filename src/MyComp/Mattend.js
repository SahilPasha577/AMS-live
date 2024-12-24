import React from 'react'
import { useState } from 'react';
import { auth, firestore } from '../Authen/firebase';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../Authen/useAuth';

export const Mattend = ({ CURRENT_USER_TYPE }) => {

    const { currentUser } = useAuth();

    const mattend = async () => {
        try {
            let currentDate = new Date();
            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1; // January is 0, so we add 1
            let year = currentDate.getFullYear();
            let formattedDate = day + "-" + month + "-" + year;

            // // Check if attendance for today's date exists in Firestore
            // const querySnapshot = await getDocs(
            //     query(collection(firestore, 'attend'), where('markedAt', '==', formattedDate))
            // );

            const userId = auth?.currentUser?.uid;

            // Check if attendance for today's date and current user exists in Firestore
            const querySnapshot = await getDocs(
                query(collection(firestore, 'attend'),
                    where('userId', '==', userId),
                    where('markedAt', '==', formattedDate)
                )
            );

            if (!querySnapshot.empty) {
                console.log("Attendance already marked for today");

                let a = document.getElementById("msg1");
                a.innerHTML = "Attendance already marked for today";

            }
            else {
                // Attendance for today's date doesn't exist, so add it to Firestore
                await addDoc(collection(firestore, 'attend'), {
                    userId: auth?.currentUser?.uid,
                    user: currentUser?.name,
                    markedAt: formattedDate,
                    date: formattedDate,
                    status: "present"
                });
                console.log("Attendance marked successfully");

                let b = document.getElementById("msg1");
                b.innerHTML = "Attendance marked successfully";
            }
        } catch (error) {
            console.error("Error marking attendance:", error);

        }
    };


    return (
        <>
            {CURRENT_USER_TYPE === "Candidate_User" ?
                (
                    <>
                        <div className='container msg' id='msg1'>

                        </div>

                        <div className='container my-4'>
                            <Link onClick={mattend} type="button" className="btn btn-primary m-4" to="/mattend">Mark Attendance</Link>
                        </div>
                    </>
                )
                :
                (

                    <div>You are not authorized</div>
                )
            }
        </>
    )
}
