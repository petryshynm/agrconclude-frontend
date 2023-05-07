import { Link, useLocation } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { navLinks } from '../../services/routes/constants';
import { useMediaQuery } from '../../services/hooks/useMediaQuery';
import { toggleModal } from '../../store/actions/main/main.actions';

import './Header.scss'

export const Header = () => {
    const { authentificated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const headerRef = useRef()
    const burgerRef = useRef()
    const isMainPage = pathname === '/'
    const isHamburgerMenu = useMediaQuery('(max-width: 1100px)')
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleClick = (isOpen) => {
        setMenuOpen(isOpen);
        dispatch(toggleModal.request(isOpen));
    }

    const renderLink = ({path, isProtected, icon, label}) => {
        return <Link
            key={path}
            to={path}
            className={classNames({ "protected": isProtected && authentificated})}
        >
            {icon && !isHamburgerMenu ? icon : label}
        </Link>
    }

    useEffect(() => {
        const handleScroll = function() {
            const header = headerRef.current;
            const burger = burgerRef.current;
            if (header) {
                const headerHeight = header.offsetHeight;
                const scrollTopThreshold = headerHeight / 4;
                const scrollTop = window.pageYOffset;
                if (scrollTop > scrollTopThreshold) {
                    header.classList.add('header_fixed');
                } else {
                    header.classList.remove('header_fixed');
                }
                if (isMainPage && scrollTop <= scrollTopThreshold) {
                    burger?.classList.add('burger-btn_light');
                } else {
                    burger?.classList.remove('burger-btn_light');
                }
            }
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMainPage, isHamburgerMenu]);

    return (
        <header ref={headerRef} className={classNames("header", {
            "header_main": isMainPage
        })}>
            {!isMainPage && <Link to="/" className="logo">
                <img src="/assets/icons/logo-full.svg" alt="logo"/>    
            </Link>}
            {isHamburgerMenu && <div ref={burgerRef} className="burger-btn" onClick={() => handleClick(true)}>
                <span/>    
                <span/>    
                <span/>    
            </div>}
            <nav
                onClick={() => isHamburgerMenu && isMenuOpen && handleClick(false)}
                className={classNames("menu", {
                    "menu_hamburger": isHamburgerMenu,
                    "menu_opened": isMenuOpen
                })}
            >
                {navLinks.map((link) => (
                    !link.isProtected 
                        ? renderLink(link) 
                        : authentificated && renderLink(link)
                ))}
            </nav>
        </header>
    )
}