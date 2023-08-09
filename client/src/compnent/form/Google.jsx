import React from "react";
import GoogleLogin from "react-google-login";

const GoogleLoginButton = () => {
  const responseGoogle = (response) => {
    // Handle successful login
    // console.log(response);
  };

  const responseErrorGoogle = (response) => {
    // Handle login failure
    // console.error(response);
  };

  return (
    <GoogleLogin
      clientId="934937401410-tb3m63b6qfsrs80bi63vjhv708kcuctk.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseErrorGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginButton;
