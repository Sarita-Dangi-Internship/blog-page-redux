import React, { Component } from "react";
import { connect } from "react-redux";
import { getAccessToken, setAccessToken } from "../utils/token";
import {
  setUserName,
  setUserImage,
  setUserEmail,
  setUserId,
} from "../utils/userdata";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { updateUserData, increment } from "../actions/actions";

import * as todoService from "../services/blogs";

class Login extends Component {
  onSuccess = (response) => {
    const authLogin = async () => {
      try {
        const res = await todoService.authLogin({
          token: response.tokenId,
        });
        const data = res.data.data;
        setAccessToken(data.accessToken);
        setUserImage(data.image);
        setUserName(data.name);
        setUserId(data.id);
        setUserEmail(data.email);
        this.props.updateUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    authLogin();
    if (this.props.userData.name !== null) this.props.history.push("/");
  };

  onFailure = (response) => {
    console.log("login failed", response);
  };

  render() {
    console.log("render userdata", this.props.userData);
    return (
      <div className="login-page">
        <div className="google-login">
          <GoogleLogin
            clientId="1058823769266-758kalf90cmirensqppf8qt6rfebpvjs.apps.googleusercontent.com"
            buttonText="Login with google"
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.reducer.userData,
});
const mapDispatchToProps = () => {
  return {
    updateUserData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Login);
