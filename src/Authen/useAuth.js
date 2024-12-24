import React from 'react'
import { useContext } from 'react'
import { AuthContext } from './AuthProvider'

export const useAuth = () => {
    const {
        currentUser,
        isCheckingState,
        isLoggingOut,
        isProfileLoading,
        onLogout,
        onProfileReload,
    } = useContext(AuthContext);

    return {
        currentUser,
        isCheckingState,
        isLoggingOut,
        isProfileLoading,
        onLogout,
        onProfileReload,
    };
};
