import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { firestore } from '../Authen/firebase';

export const Aadd = () => {

    const messageRef = collection(firestore, "attend");

    const [value, setValue] = useState({
        // id: id,
        user: "",
        status: "",
        date: "",
    })

    const add = async () => {

        await addDoc(messageRef, {
            // id: useId,
            user: value.user,
            status: value.status,
            date: value.date,
        })
            .then((val) => {
                console.log("Added");
            })
    }


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
                    <button className='btn btn-primary' onClick={add}>Add</button>
                </div>
            </div>



        </>
    )
}
