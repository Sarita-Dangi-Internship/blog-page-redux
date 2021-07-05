import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signIn, signOut } from "../actions/actions";

class NavBar extends Component {
  render() {
    const { isSignedIn, userData } = this.props;

    return (
      <div className="navbar">
        <h1 className="navbar__header">Blog Post</h1>
        <div className="navbar__login">
          {isSignedIn ? (
            <Link to="/logout">
              <button onClick={() => this.props.signOut()}>Logout</button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <button onClick={() => this.props.signIn()}>
                  Login/signup
                </button>
              </Link>
            </>
          )}

          {isSignedIn ? (
            <div className="user">
              <img
                src={userData.image}
                alt="user-image"
                className="user-image"
              />
              <h1 className="user-name">{userData.name}</h1>
            </div>
          ) : (
            <></>
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
