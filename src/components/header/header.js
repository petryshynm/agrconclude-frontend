import React, { useState } from 'react'
import './header.scss'
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Paths } from '../../services/routes/paths';
import { logoutUserRequest } from '../../store/actions/auth/auth.actions';

export const Header = () => {
    const { userRole, authentificated } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    return (
        <header className="header">
            <Link to="/" className="logo">
            </Link>
            <nav className="menu">
                <div className="menu__navigation">
                
                </div>
                    {authentificated 
                        ? <div className="menu__btns _unauthorized">
                            <Link to={userRole === 'Admin' ? Paths.ADMIN : Paths.PROFILE} className="menu__user link" >
                                link1
                            </Link>
                            <Link 
                                to="/login" 
                                onClick={()=>{
                                    dispatch(logoutUserRequest())
                                    localStorage.clear();
                                }} 
                                className="menu__logout link">
                                link 2
                            </Link>
                        </div> 
                        :  <div className="menu__btns">
                            <Link to="/register">
                                <button type="button" className="menu__btn ">Реєстрація</button>
                            </Link>
                            <Link to="/login" >
                                <button type="button" className="menu__btn">Вхід</button>
                            </Link>
                        </div>
                    }
            </nav>
        </header>
    )
}