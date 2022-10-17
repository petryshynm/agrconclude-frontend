import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/loader";
import { Paths } from "../../services/routes/paths";
import { loginUserRequest } from "../../store/actions/auth/auth.actions";
import "./sign-in.scss";

import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

const clientId = process.env.REACT_APP_CLIENT_ID || "";

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector(
    (state) => state.auth
  );
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res) => {
    setProfile(res.profileObj);
    console.log(res);
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };

  const logOut = () => {
    setProfile(null);
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <div>
        <h2>React Google Login</h2>
        <br />
        <br />
        {profile ? (
          <div>
            <img src={profile.imageUrl} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <GoogleLogout
              clientId={clientId}
              buttonText="Log out"
              onLogoutSuccess={logOut}
            />
          </div>
        ) : (
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        )}
      </div>
    </>
  );
};
