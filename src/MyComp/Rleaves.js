import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import React from 'react'
import { Link } from 'react-router-dom'
import { auth, firestore } from '../Authen/firebase'
import { useAuth } from '../Authen/useAuth'

export const Rleaves = () => {

    const { currentUser } = useAuth();

    const messageRef = collection(firestore, "attend");

    const mleaves = async () => {

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
            console.log("Leave already marked for today");

            // let a = document.getElementById("msg1");
            // a.innerHTML = "Attendance already marked for today";

        }

        else {

            await addDoc(messageRef, {
                userId: auth?.currentUser?.uid,
                user: currentUser?.name,
                status: "leave pending",
                pics: auth?.currentUser?.photoURL,
                date: formattedDate,
                markedAt: formattedDate,
                // approval: "pending"
            })
                .then((value) => {
                    console.log("Leave Added")
                })
        }
    }

    return (
        <>
            <div className='container my-4'>
                <Link onClick={mleaves} type="button" className="btn btn-danger m-4">Request Leave</Link>
            </div>
        </>
    )
}
