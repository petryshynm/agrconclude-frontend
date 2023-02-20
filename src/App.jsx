import { useEffect }from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { gapi } from 'gapi-script';

import { Main } from './layouts/main';
import { Header } from './components/header'
import { Loader } from './components/loader';
import { ProtectedRoute } from './services/routes/protectedRoute';

import { logoutUserRequest, loginUserSuccess } from './store/actions/auth/auth.actions';
import { protectedRoutes } from './services/routes/constants';
import { Paths } from './services/routes/paths';

import './App.css';

const clientId = process.env.REACT_APP_CLIENT_ID || "";
const apiKey = process.env.REACT_APP_API_KEY || "";
const scope = process.env.REACT_APP_SCOPES || "";

const App = () => {
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

  useEffect(() => {
    async function start() {
      await gapi.client.init({
        apiKey,
        clientId,
        scope
      })
    }
    gapi.load('client:auth2', start)
  }, [])

  return (
    <Router>
        {isAppLoading && <Loader/>}
        <Header/>
        <Routes>
            <Route path={Paths.HOME} element={<Main/>}/>
            <Route path={Paths.ABOUT_US} element={<div>about us</div>}/>
            <Route path={Paths.CONTACTS} element={<div>contacts</div>}/>
            <Route path={Paths.FAQ} element={<div>faq</div>}/>
            {protectedRoutes.map(({path, render}) => (
                <Route path={path} element={
                    <ProtectedRoute isAllowed={isAuth}>{render}</ProtectedRoute>
                }/>
            ))}
            <Route path="*" element={<div>not found</div>}/>
        </Routes>
    </Router>
  )
}

export default App;
