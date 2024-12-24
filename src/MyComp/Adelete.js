import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { firestore } from '../Authen/firebase';

export const Adelete = () => {

    const [value, setValue] = useState({
        user: "",
        date: "",
    });

    const deleteData = async () => {
        // Construct a query to find the document(s) with matching user and date
        const q = query(collection(firestore, 'attend'),
            where('user', '==', value.user),
            where('date', '==', value.date));

        // Execute the query
        const querySnapshot = await getDocs(q);

        // Loop through the matching documents and delete them
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            console.log("Document deleted successfully");
        });
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
                    <button className='btn btn-danger' onClick={deleteData}>Delete</button>
                </div>
            </div>


        </>
    )
}
