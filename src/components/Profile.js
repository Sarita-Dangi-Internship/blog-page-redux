import React, { Component } from "react";

export default class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <h1 className="profile__title">Edit your profile</h1>
        <form>
          <label for="name"> Name</label>{" "}
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name..."
          />
          <label for="email">Email</label>
          <input
            type="email"
            id="emial"
            name="email"
            placeholder="Your email..."
          />
          <label for="phonenumber">Phone Number</label>
          <input
            type="number"
            id="phonenumber"
            name="phonenumber"
            placeholder="Your phone number..."
          />
          <label for="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="adress.."
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
