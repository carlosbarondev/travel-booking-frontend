import { Navigate, useLocation } from "react-router-dom";


export const PrivateRoute = ({ isAuthenticated, children }) => {

    const { pathname, search } = useLocation();
    localStorage.setItem('lastPath', pathname + search);

    return isAuthenticated
        ? children
        : <Navigate to="/login" replace={true} />
}