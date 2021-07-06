import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'
import { getAccessToken, setAccessToken } from "../utils/token";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { updateUserData, increment } from "../actions/actions";

import * as todoService from "../services/blogs";

class Login extends Component {
  onSuccess = (response) => {
    console.log("login success", response);
    const authLogin = async () => {
      try {
        const res = await todoService.authLogin({
          token: response.tokenId,
        });
        const data = res.data.data;
        console.log("login auth", data);
        setAccessToken(data.accessToken);
        console.log("token", getAccessToken());
        this.props.updateUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    authLogin();
  };

  onFailure = (response) => {
    console.log("login failed", response);
  };

  render() {
    console.log("render userdata", this.props.userData);
    return (
      <>
        <div>
          <GoogleLogin
            clientId="1058823769266-758kalf90cmirensqppf8qt6rfebpvjs.apps.googleusercontent.com"
            buttonText="Login with google"
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        </div>
        <button onClick={() => this.props.increment()}>CLick</button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
  increment: state.auth.increment,
});
const mapDispatchToProps = () => {
  return {
    increment,
    updateUserData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Login);
