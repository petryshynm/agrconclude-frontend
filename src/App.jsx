import { useEffect }from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { gapi } from 'gapi-script';


import { Loader } from './components/Loader';
import { Header } from './components/Header';
import { ProtectedRoute } from './services/routes/protectedRoute';

import { loginUserActions, logoutUserActions } from './store/actions/auth/auth.actions';
import { protectedRoutes, defaultRoutes } from './services/routes/constants';
import { Footer } from './components/Footer';

import './styles/style.scss';

const clientId = process.env.REACT_APP_CLIENT_ID || "";
const apiKey = process.env.REACT_APP_API_KEY || "";
const scope = process.env.REACT_APP_SCOPES || "";

const App = () => {
  const reducerLoading = useSelector(state => state)
  const isModalOpen = useSelector(state => state.main.isModalOpen);

  const dispatch = useDispatch();

  const isAppLoading = Object.keys(reducerLoading).some((key) => reducerLoading[key].loading)
  
  useEffect(() => {
    document.body.style.overflow = isAppLoading || isModalOpen ? 'hidden' : 'visible';
  },[isAppLoading, isModalOpen])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    const accessToken = localStorage.getItem('accessToken')
    token && accessToken 
      ? dispatch(loginUserActions.success(token)) 
      : dispatch(logoutUserActions.request()) 
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
        <main>
          <Routes>
              {protectedRoutes.map(({path, render}) => (
                <Route key={path} path={path} element={
                  <ProtectedRoute>{render}</ProtectedRoute>
                }/>
              ))}
              {defaultRoutes.map(({path, render}) => {
                const content = <>
                  {render}
                  <Footer/>
                </>
                return <Route key={path} path={path} element={content}/>
              })}
          </Routes>
        </main>
    </Router>
  )
}

export default App;
