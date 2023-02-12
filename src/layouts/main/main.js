import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";

import { Loader } from "../../components/loader";
import { Paths } from "../../services/routes/paths";
import { loginUserRequest, logoutUserRequest } from "../../store/actions/auth/auth.actions";

import "./main.scss";

export const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, profile } = useSelector(
    (state) => state.auth
  );

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
  return (
    <>
      {loading ? <Loader /> : null}
      <div>
        {profile ? (
            <button onClick={logOut}>log out</button>
        ) : (
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onFailure}
            />
        )}
      </div>
    </>
  );
};
