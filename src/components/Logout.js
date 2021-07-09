import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";
import { deleteAccessToken } from "../utils/token";
import { deleteUserName, deleteUserImage } from "../utils/userdata";

export default class Logout extends Component {
  onSuccess = () => {
    deleteAccessToken();
    deleteUserImage();
    deleteUserName();
    alert("Logged out");
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <GoogleLogout
          clientId="747496017326-ne6ou5cp7ugmolbehhh4c29rodnf1th1.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={this.onSuccess}
        />
      </div>
    );
  }
}
