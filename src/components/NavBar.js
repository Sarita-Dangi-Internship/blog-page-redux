import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getAccessToken, setAccessToken } from "../utils/token";
import { getUserName, getUserImage } from "../utils/userdata";
import { signIn, signOut } from "../actions/actions";

class NavBar extends Component {

  render() {
    const token = getAccessToken();
    const name = getUserName();
    const image = getUserImage();
    const { isSignedIn, userData } = this.props;

    return (
      <div className="navbar">
        <h1 className="navbar__header">Blog Post</h1>
        <div className="navbar__login">
          {token ? (
            <>
              <Link to="/logout">
                <button
                  // onClick={() => this.props.signOut()}
                >Logout</button>
              </Link>
              <Link to="/profile">
                <button>View Profile</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                  <button
                    // onClick={() => this.props.login()}
                  >
                  Login/signup
                </button>
              </Link>
            </>
          )}

          {token? (
            <div className="user">
              <img
                src={image}
                alt="user-image"
                className="user-image"
              />
              <h1 className="user-name">{name}</h1>
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

const mapDispatchToProps = (dispatch) => {
  return {
    login:()=>dispatch(signIn()),
    signOut,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
