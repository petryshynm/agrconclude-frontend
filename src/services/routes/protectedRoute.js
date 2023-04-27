import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { Paths } from './paths';

export const ProtectedRoute = ({children}) => {
    const isAuth = useSelector(state => state.auth.authentificated) || localStorage.getItem('token');
    return !isAuth ? <Navigate to={Paths.HOME} replace /> : children
}