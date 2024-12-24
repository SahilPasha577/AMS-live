import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ isAllowed, redirectUrl = "signin" }) => {
    if (!isAllowed) return <Navigate to={redirectUrl} replace />;
    return <Outlet />;
};

export default ProtectedRoute;
