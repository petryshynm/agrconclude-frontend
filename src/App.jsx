import { useEffect }from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { Main } from './layouts/main';
import { Profile } from './layouts/profile';
import { Header } from './components/header'
import { Footer } from './components/footer';
import { Loader } from './components/loader';
import { ProtectedRoute } from './services/routes/protectedRoute';

import { logoutUserRequest, loginUserSuccess } from './store/actions/auth/auth.actions';
import { protectedRoutes } from './services/routes/constants';

import './App.css';

function App() {
  const reducerLoading = useSelector(state => state)
  const isAuth = useSelector(state => state.auth.authentificated);

  const dispatch = useDispatch();

  const isAppLoading = Object.keys(reducerLoading).some((key) => reducerLoading[key].loading)
  
  useEffect(() => {
    document.body.style.overflow = isAppLoading ? 'hidden' : 'visible';
  },[isAppLoading])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    token ? dispatch(loginUserSuccess(token)) : dispatch(logoutUserRequest()) 
  }, [dispatch])

  return (
    <Router>
        {isAppLoading && <Loader/>}
        <Header/>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="profile" element={<Profile/>}/>
            {protectedRoutes.map(({path, render}) => (
                <Route path={path} element={
                    <ProtectedRoute isAllowed={isAuth}>{render}</ProtectedRoute>
                }/>
            ))}
            <Route path="*" element={<div>not found</div>}/>
        </Routes>
        <Footer/>
    </Router>
  )
}

export default App;
