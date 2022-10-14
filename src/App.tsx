import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

import './App.css';

const clientId = process.env.CLIENT_ID || ''

console.log(process.env)

function App() {
  const [ profile, setProfile ] = useState<any>(null);
  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res: any) => {
    setProfile(res.profileObj);
    console.log(res)
  };
  const onFailure = (err: any) => {
      console.log('failed:', err);
  };

  const logOut = () => {
    setProfile(null);
  };

  return (
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
                <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
            </div>
        ) : (
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        )}
    </div>
  );
}

export default App;
