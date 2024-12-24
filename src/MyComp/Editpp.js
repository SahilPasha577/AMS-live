import React, { useState } from 'react'
import { auth } from '../Authen/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

export const Editpp = ({ currentUser }) => {

    // const [pic, setPic] = useState({
    //     picture: "",
    // });

    // const [pic, setPic] = useState({
    //     picture: currentUser?.photoURL || "", // Initialize the picture state with currentUser's photoURL if available
    // });

    // const editpp = async () => {
    //     setPic({ ...pic, picture: pic })
    // }

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            // Create a storage reference
            const storage = getStorage();
            const storageRef = ref(storage, 'profilePictures/' + selectedFile.name);

            // Upload file to Firebase Storage
            await uploadBytes(storageRef, selectedFile);

            // Get the download URL of the uploaded file
            const downloadURL = await getDownloadURL(storageRef);

            // Update user's photoURL with the download URL
            const currentUser = auth.currentUser;
            if (currentUser) {
                await updateProfile(currentUser, { photoURL: downloadURL });
                console.log("PhotoURL updated successfully");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    // const [pic, setPic] = useState({
    //     picture: "",
    // });

    // const editpp = async () => {
    //     setPic({ ...pic, picture: pic })
    // }

    return (
        <>
            {/* <img
              
                style={{ height: "25px" }}
                className="rounded-circle m-2"
                src={auth?.currentUser?.photoURL}
                alt="Profile"
            // value={pic?.picture}
            // onClick={editpp}
            // onChange={(e) => setPic({ ...pic, picture: e.target.value })}
            /> */}

            <div className='container my-4'>
                <div class="mb-3 my-4">
                    <label for="formFile" class="form-label">Choose Profile Picture</label>
                    <input onChange={handleFileChange} class="form-control b-dark" type="file" id="formFile" />
                </div>
                {/* <input type="file" onChange={handleFileChange} /> */}
                <button onClick={handleUpload} className='btn btn-success'>Upload</button>
            </div>

            <div className='container my-4'>
                <img

                    style={{ height: "65px" }}
                    className="rounded-circle m-2"
                    src={auth?.currentUser?.photoURL}
                    alt="Profile"
                />
            </div>
        </>

    )
}
