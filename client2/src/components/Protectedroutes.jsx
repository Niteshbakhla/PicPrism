import { useSelector } from "react-redux";
import { Navigate, useNavigate, useLocation } from "react-router-dom"
export const ProtectedRoute = ({ children, requiresAuth = true }) => {
            const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
            const role = useSelector((state) => state.auth.role)
            const location = useLocation();
            const navigate = useNavigate()


            if (isAuthenticated && (location.pathname === "/login" || location.pathname === "/signup")) {
                        return <Navigate to={`/${role.toLowerCase()}/profile`} />
            }

            if (!isAuthenticated && requiresAuth) {
                        return <Navigate to={"/login"} />
            }

            if (isAuthenticated && role === "buyer") {
                        return children
            }


            return children

}