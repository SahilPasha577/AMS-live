import React from 'react'
import { useMutation } from 'react-query';
import { useState } from 'react';
import { AuthService } from '../Authen/AuthService';
import { useNavigate } from 'react-router-dom';

export const Login = () => {


    const history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutateAsync: onLogin, isLoading: isLoggin } = useMutation(
        (params) => AuthService.logInWithEmail(params),
        {
            onSuccess: (res) => {
                console.log("sigin response: ", res);
                // setCheckingState(false);
                // window.location.href = `/signin`;
            },
            onError: (error) => {
                // notifications.show({ color: "red", message: error });
                alert(error);
            },
        }
    );

    const signin = () => {
        if (!email || !password) {
            alert("Fields cannot be Empty");
        }

        else {
            onLogin({ email, password });
        }
    };


    return (
        <div className="container my-4">
            <h1>Log In </h1>

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

            <div className="container my-4">
                <button onClick={signin} type="button" className="btn btn-primary">
                    Sign In
                </button>
            </div>
        </div>
    )
}
