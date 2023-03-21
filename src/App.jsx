import { useEffect }from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { gapi } from 'gapi-script';

import { Header } from './components/Header'
import { Loader } from './components/Loader';
import { ProtectedRoute } from './services/routes/protectedRoute';

import { logoutUserRequest, loginUserSuccess } from './store/actions/auth/auth.actions';
import { protectedRoutes, defaultRoutes } from './services/routes/constants';

const clientId = process.env.REACT_APP_CLIENT_ID || "";
const apiKey = process.env.REACT_APP_API_KEY || "";
const scope = process.env.REACT_APP_SCOPES || "";

const App = () => {
  const reducerLoading = useSelector(state => state)

  const dispatch = useDispatch();

  const isAppLoading = Object.keys(reducerLoading).some((key) => reducerLoading[key].loading)
  
  useEffect(() => {
    document.body.style.overflow = isAppLoading ? 'hidden' : 'visible';
  },[isAppLoading])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    const accessToken = localStorage.getItem('accessToken')
    token && accessToken 
      ? dispatch(loginUserSuccess(token)) 
      : dispatch(logoutUserRequest()) 
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
                <Route path={path} element={
                  <ProtectedRoute>{render}</ProtectedRoute>
                }/>
              ))}
              {defaultRoutes.map(({path, render}) => <Route path={path} element={render}/>)}
          </Routes>
        </main>
    </Router>
  )
}

export default App;
