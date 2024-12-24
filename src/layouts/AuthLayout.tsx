import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"

function AuthLayout() {

    const token = useSelector((state: any) => state.auth.token);

    if (token) {
        return <Navigate to="/" replace />
    }
    return (
        <>
            {<Outlet />}
        </>
    )
}

export default AuthLayout