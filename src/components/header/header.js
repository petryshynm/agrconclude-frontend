import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { navLinks } from '../../services/routes/constants';

import './header.scss'

export const Header = () => {
    const { authentificated } = useSelector((state) => state.auth);
    const { pathname } = useLocation();
    return (
        <header className="header">
            {pathname === '/' && <Link to="/" className="logo">logo</Link>}
            <nav className="menu">
                {navLinks.map(({path, label, isProtected}) => (
                    !isProtected 
                        ? <Link to={path}>{label}</Link>
                        : authentificated && <Link className="protected" to={path}>{label}</Link>
                ))}
            </nav>
        </header>
    )
}