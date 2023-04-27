import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";

import { loginUserActions, logoutUserActions } from "../../store/actions/auth/auth.actions";

import './AuthButton.scss';

const clientId = process.env.REACT_APP_CLIENT_ID || "";

export const AuthButton = () => {
    const { authentificated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onLoginSuccess = (data) => {
        const { tokenId, accessToken } = data;
        localStorage.setItem('accessToken', accessToken)
        dispatch(loginUserActions.request({tokenId}))  
    };

    const onLoginFailure = (err) => {
        console.log("failed:", err);
    };
    
    const logout = () => {
        dispatch(logoutUserActions.request());
    };

    return authentificated 
        ? <button onClick={logout} className="auth-btn">Sign Out</button>
        : <GoogleLogin
            clientId={clientId}
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={authentificated}
            render={renderProps => (
                <button onClick={renderProps.onClick} className="auth-btn">Sign In</button>
            )}
        />
}