import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { firestore } from '../Authen/firebase';

export const Aedit = () => {

    const [value, setValue] = useState({
        // id: id,
        user: "",
        status: "",
        date: "",
    })




    const update = async () => {
        try {
            // Validate input fields
            if (!value.user || !value.status || !value.date) {
                console.log("Please fill in all fields");
                // return;
            }

            // Find the document to update based on the provided date
            const querySnapshot = await getDocs(
                query(collection(firestore, 'attend'),
                    where('date', '==', value.date),
                    where('user', '==', value.user)
                )
            );

            // Check if the document exists
            if (!querySnapshot.empty) {
                // Get the ID of the first matching document
                const docId = querySnapshot.docs[0].id;

                // Get a reference to the specific document
                const docRef = doc(collection(firestore, 'attend'), docId);

                // Update the specific document using its reference
                await updateDoc(docRef, {
                    status: value.status,
                    user: value.user
                });

                console.log("Document updated successfully");
            } else {
                console.log("No matching document found for the provided date");
            }
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };


    return (
        <>

            <div className='container'>
                <div className="container my-4">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control border border-dark"
                            value={value.user}
                            onChange={(e) => setValue({ ...value, user: e.target.value })}
                            id="exampleFormControlInput1"
                            placeholder="Name"
                        />
                    </div>
                </div>
                <div className="container my-4">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">
                            Status
                        </label>
                        <input
                            type="text"
                            className="form-control border border-dark"
                            value={value.status}
                            onChange={(e) => setValue({ ...value, status: e.target.value })}
                            id="exampleFormControlInput1"
                            placeholder="Status"
                        />
                    </div>
                </div>
                <div className="container my-4">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">
                            Date
                        </label>
                        <input
                            type="text"
                            className="form-control border border-dark"
                            value={value.date}
                            onChange={(e) => setValue({ ...value, date: e.target.value })}
                            id="exampleFormControlInput1"
                            placeholder="Date"
                        />
                    </div>
                </div>
                <div className='container my-4'>
                    <button className='btn btn-success' onClick={update}>Update</button>
                </div>
            </div>



        </>
    )
}
