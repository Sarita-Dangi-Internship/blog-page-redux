import React, { Component } from "react";
import { getAccessToken, setAccessToken } from "../utils/token";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { updateUserData, increment } from "../actions/actions";
import { connect } from "react-redux";

class Login extends Component {
  onSuccess = (response) => {
    console.log("login success", response);
    setAccessToken(response.accessToken);
    console.log("token", getAccessToken());
    this.props.updateUserData(response);
  };

  onFailure = (response) => {
    console.log("login failed", response);
  };
  render() {
    console.log("data", this.props.userData);
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
        {/* <span>{this.props.userData && this.props.userData.name}</span>
        <span>{this.props.userData && this.props.userData.image}</span> */}
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
