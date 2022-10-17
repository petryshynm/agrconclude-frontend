import { Navigate } from 'react-router-dom'
import { Paths } from './paths';

export const ProtectedRoute = ({isAllowed, children}) => {
    return !isAllowed ? <Navigate to={Paths.HOME} replace /> : children
}