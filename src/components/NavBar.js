import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signIn, signOut } from "../actions/actions";

import {
  refreshTokenSetup,
  getAccessToken,
  setAccessToken,
} from "../utils/token";

class NavBar extends Component {
  // handleInput = (input) => {
  //   this.setState({ input });
  // };

  render() {
    const { isSignedIn } = this.props;

    return (
      <div className="navbar">
        <h1 className="navbar__header">Blog Post</h1>
        <div className="navbar__login" >
          {isSignedIn ? (
            <Link to="/logout">
              <button>Logout</button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <button>Login/signup</button>
              </Link>
             
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userData: state.auth.userData,
  };
};

const mapDispatchToProps = () => {
  return {
    signIn,
    signOut,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(NavBar);
