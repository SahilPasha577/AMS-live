import React, { useState } from 'react'
import { useMutation } from 'react-query';
import { AuthService } from '../Authen/AuthService';
import { auth } from '../Authen/firebase';
import { useAuth } from '../Authen/useAuth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';


export const Signin = () => {

    const { currenUser } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const [photoURL, setPhotoURL] = useState('');

    // const [selectedFile, setSelectedFile] = useState(null);

    // const handleFileChange = (e) => {
    //     setSelectedFile(e.target.files[0]);
    // };


    // const handleUpload = async () => {
    //     try {
    //         // Create a storage reference
    //         const storage = getStorage();
    //         const storageRef = ref(storage, 'profilePictures/' + selectedFile.name);

    //         // Upload file to Firebase Storage
    //         await uploadBytes(storageRef, selectedFile);

    //         // Get the download URL of the uploaded file
    //         const downloadURL = await getDownloadURL(storageRef);
    //         setPhotoURL(downloadURL); // Set the photoURL state with the download URL
    //     } catch (error) {
    //         console.error("Error uploading file:", error);
    //     }
    // };

    const { mutateAsync: onSignUp, isLoading: islogging } = useMutation(
        (params) => AuthService.createAccount(params),
        {
            onSuccess: (res) => {
                console.log(res);
                // window.location.href = "/login";
                console.log("success")
                // const {userId} = res;
            },

            onError: (error) => {
                alert(error);
            }
        }
    )



    const signin = () => {
        if (!name || !email || !password) {
            alert("Fields cannot be empty");
        }
        else {
            onSignUp({ email, password, userType: "Candidate_User", name })
        }

    }





    return (
        <div className="container my-4">
            <h1>Sign UP </h1>

            <div className="container my-4">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="exampleFormControlInput1"
                        placeholder="Name"
                    />
                </div>
            </div>

            <div className="container my-4">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="exampleFormControlInput1"
                        placeholder="Email"
                    />
                </div>
            </div>

            <div className="container my-4">
                <label htmlFor="inputPassword5" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    id="inputPassword5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password"
                />
            </div>

            {/* <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div> */}

            <div className="container my-4">
                <button type="button" onClick={signin} className="btn btn-primary">
                    Sign Up
                </button>
            </div>
        </div>
    )
}
