import React, { createContext, useState } from 'react'
import { useMutation } from 'react-query';
import { AuthService } from './AuthService';
import { auth } from './firebase';
import { useEffect } from 'react';

const initialState = {
    id: "",
    email: "",
    name: "",
    updatedAt: "",
    createdAt: "",
    profileImage: "",
    phoneNumber: "",
    userId: "",
};
export const AuthContext = createContext({
    onLogout: () => { },
    onProfileReload: () => { },
    isProfileLoading: false,
    isCheckingState: true,
    currentUser: initialState,
    isLoggingOut: false,
});

export const AuthProvider = ({ children }) => {
    const [isCheckingState, setCheckingState] = React.useState(true);

    const [profile, setProfile] = React.useState({
        currentUser: initialState,
    });

    const { mutateAsync: onLogout, isLoading: isLoggingOut } = useMutation(
        () => AuthService.signout(),
        {
            onSuccess: (res) => {
                setCheckingState(false);
                window.location.href = `/signin`;
            },
            onError: (error) => {
                // notifications.show({ color: "red", message: error });
                alert(error);
            },
        }
    );

    const {
        isLoading: isProfileLoading,
        mutateAsync: onGetProfile,
        mutate: onProfileReload,
    } = useMutation((params) => AuthService.getCurrentUser(params), {
        onSuccess: async (currentUser) => {


            setCheckingState(false);
            setProfile({
                currentUser: {
                    ...currentUser,
                },
            });
        },
        onError: (error) => {
            if (profile.currentUser.userId) {
                onLogout();
            } else {
                onLogout();
            }
        },
    });



    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                onGetProfile({ id: currentUser.uid });
            } else {
                setCheckingState(false);
                setProfile({ currentUser: initialState });
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                onLogout,
                onProfileReload,
                isProfileLoading,
                isCheckingState,
                currentUser: profile.currentUser,
                isLoggingOut,

            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

