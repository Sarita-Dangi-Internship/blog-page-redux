import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";
import {
  deleteAccessToken
} from "../utils/token";

export default class Logout extends Component {
  onSuccess = () => {
    deleteAccessToken("")
    alert("Logged out");
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
