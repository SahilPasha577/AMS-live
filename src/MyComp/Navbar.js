import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Authen/useAuth';
import Cookies from 'universal-cookie';
import { auth, provider } from '../Authen/firebase';
import { signInWithPopup } from 'firebase/auth';


const cookie = new Cookies();

export const Navbar = ({ currentUser, CURRENT_USER_TYPE }) => {

    const { onLogout } = useAuth();

    const [isAuth, setIsAuth] = useState(cookie.get("auth-token"))

    const signin = async () => {

        try {
            const result = await signInWithPopup(auth, provider);
            cookie.set("auth-token", result?.user?.refreshToken)
            // console.log(result);
            setIsAuth(true);
        }
        catch (error) {
            console.log(error);
        }

    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">AMS</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">


                        {CURRENT_USER_TYPE === "Admin_User" || CURRENT_USER_TYPE === "Candidate_User" ?
                            (
                                <li className="nav-item">
                                    <Link className="nav-link " aria-current="page" to="/">Home</Link>
                                </li>
                            )
                            :
                            (
                                <></>
                            )
                        }

                        {CURRENT_USER_TYPE === "Admin_User" ?
                            (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="/aadd">Add attend</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="/aview">View attend</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="/aedit">Edit attend</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="/adelete">Delete attend</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="/reportgen">Create Report</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/editpp">Add/Edit Profile Pic</Link>
                                    </li>
                                </>
                            )
                            :
                            (
                                <></>
                            )
                        }

                        {CURRENT_USER_TYPE === "Candidate_User" ?
                            (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/mattend">Mark Attendance</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/rleaves">Request Leaves</Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link className="nav-link" to="/vattend">View Attendance</Link>
                                    </li> */}
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/editpp">Add/Edit Profile Pic</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="/myattend">My Attendance</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="/myreportgen">Create My Report</Link>
                                    </li>
                                </>
                            )
                            :
                            (
                                <></>
                            )
                        }


                    </ul>
                    {/* <Link className='btn btn-danger mx-2' to="/signin">Sign in</Link>
                    <Link className='btn btn-danger mx-2' to="/login">Log in</Link> */}

                    {currentUser?.userId === "" && (
                        <Link className="btn btn-danger mx-2" to="/signin" role="button">
                            Sign up
                        </Link>
                    )}
                    {currentUser?.userId === "" && (
                        <Link className="btn btn-danger mx-1" to="/login" role="button">
                            Log in
                        </Link>
                    )}

                    {/* {currentUser?.userId === "" && (
                        <Link onClick={signin} className="btn btn-danger mx-1" role="button">
                            Sign in with Google
                        </Link>
                    )} */}

                    {currentUser?.userId !== "" && (
                        <button className="btn btn-primary" onClick={() => onLogout()}>Logout</button>
                    )}

                    <div className="text-light p-2">{currentUser?.name}</div>
                    {currentUser?.userId !== "" && (
                        <img className='rounded-circle m-2' src={auth?.currentUser?.photoURL} alt="Profile" style={{ height: "25px" }} />
                    )}

                    <div className="text-light">{CURRENT_USER_TYPE}</div>
                    {/* <div className="text-light">{auth?.currentUser?.photoURL}</div> */}

                </div>
            </div>
        </nav>
    )
}
