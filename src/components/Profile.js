import React, { Component } from "react";
import { updateUserProfile, getProfile } from "../actions/actions";
import { connect } from "react-redux";
import { getUserName, getUserImage, getUserId, getUserEmail } from "../utils/userdata";


class Profile extends Component {
  state = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  };

  componentDidMount = () => {
    this.props.getUser(this.props.userData.id);

  };
  handleOnChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
    console.log("profile", event.target.value);
  };

  handleOnSubmit = async (id) => {
    const data = {
      name: this.state.name,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
    };
    try {
      const response = await this.props.updateUser(id, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  fetchUserProfile = async (id) => {
    try {
      const response = await this.props.getUser(id);
      console.log("profile data", response);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { userData, profile } = this.props;
    console.log("profile array", profile);
    const name = getUserName();
    const id = getUserId();
    return (
      <div className="profile">
        <h1 className="profile__title">Edit your profile</h1>
        <label htmlFor="name"> Name</label>{" "}
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={name}
          onChange={this.handleOnChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
         value={this.state.email}
          onChange={this.handleOnChange}
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="number"
          id="phoneNumber"
          name="phoneNumber"
          value={this.state.phoneNumber}
          onChange={this.handleOnChange}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={this.state.address}
          onChange={this.handleOnChange}
        />
        <button
          className="button"
          type="submit"
          onClick={() => this.handleOnSubmit(id)}
        >
          Submit
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.reducer.userData,
    profile: state.reducer.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(getProfile(id)),
    updateUser: (id, data) => dispatch(updateUserProfile(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
