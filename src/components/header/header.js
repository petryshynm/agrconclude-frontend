import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { navLinks } from '../../services/routes/constants';

import './Header.scss'
import classNames from 'classnames';

export const Header = () => {
    const { authentificated } = useSelector((state) => state.auth);
    const { pathname } = useLocation();
    const isMainPage = pathname === '/'
    return (
        <header className={classNames("header", {
            "header_main": isMainPage
        })}>
            {!isMainPage &&<Link to="/" className="logo">logo</Link>}
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