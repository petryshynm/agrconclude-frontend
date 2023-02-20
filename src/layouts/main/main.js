import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from "react-google-login";

import { loginUserRequest, logoutUserRequest } from "../../store/actions/auth/auth.actions";
import { createDocumentRequest, getDocumentsRequest } from "../../store/actions/docs/docs.actions";

import "./main.scss";

const clientId = process.env.REACT_APP_CLIENT_ID || "";

export const Main = () => {
  const dispatch = useDispatch();
  const { authentificated } = useSelector((state) => state.auth);

  const onLoginSuccess = ({ tokenId }) => {
    dispatch(loginUserRequest({tokenId}))
    
  };
  const onLoginFailure = (err) => {
    console.log("failed:", err);
  };

  const logOut = () => {
    dispatch(logoutUserRequest());
  };

  useEffect(() => {
    console.log(authentificated)
    if (authentificated) {
      handleListFiles()
    }
  }, [authentificated])

  const createFile = async (title) => {
    dispatch(createDocumentRequest())
  }

  const handleListFiles = async () => {
    dispatch(getDocumentsRequest({}))
  };

  return <div className="main">
    {authentificated 
      ? <button className="main__btn" onClick={logOut}>log out</button> 
      : <GoogleLogin
        clientId={clientId}
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={authentificated}
        render={renderProps => (
          <button onClick={renderProps.onClick} className="main__btn">This is my custom Google button</button>
        )}
      />
    }
  </div>
};
