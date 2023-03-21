import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { Paths } from './paths';

export const ProtectedRoute = ({isAllowed, children}) => {
    const isAuth = useSelector(state => state.auth.authentificated);
    return !isAuth ? <Navigate to={Paths.HOME} replace /> : children
}