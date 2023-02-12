import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";

import { loginUserRequest, logoutUserRequest } from "../../store/actions/auth/auth.actions";

import "./main.scss";

export const Main = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  const onSuccess = ({ credential }) => {
    dispatch(loginUserRequest({tokenId: credential}))
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };

  const logOut = () => {
    dispatch(logoutUserRequest());
  };

  useEffect(() => {
    console.log(profile)
  }, [profile])
  
  return <div className="main">
    {profile 
      ? <button onClick={logOut}>log out</button> 
      : <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
      />
    }
  </div>
};
