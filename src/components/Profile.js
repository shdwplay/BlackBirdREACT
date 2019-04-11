import React from "react";
import Avatar from "./Avatar";
import "./Profile.css";
import novisible from "../assets/novisible.svg";
import visible from "../assets/visible.svg";
import Button from "./Button";
import logo from "../assets/logo_blackbird.svg";
import Back from "./Back";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import firebase from "../firebase.js";
import { listenProfile } from "../api";
class Profile extends React.Component {
  state = {
    inputTypePassword: true,
    toggleAFK: ""
  };
  changeInputType() {
    this.setState({ inputTypePassword: !this.state.inputTypePassword });
  }
  componentDidMount() {
    listenProfile(this.props.currentUser, x =>
      this.setState({ toggleAFK: !x })
    );
  }
  render() {
    return (
      <div className="ProfileContainer">
        <div className="ProfileHeader">
          <Link to={"/messages"}>
            <div className="ProfileBackButton">
              <Back onClick={() => console.log("profile")} />
            </div>
          </Link>
          <div className="ProfileLogo">
            <img alt="BlackBird Logo" src={logo} />
          </div>
        </div>
        <div className="Profile-container">
          <div className="Profile-pic-and-logout-area">
            <div className="Profile-pic">
              <Avatar size="large" name={this.props.name} />
            </div>
            <div className="Profile-logout-area">
              <div className="Profile-data">
                <div className="profile-user-name">{this.props.name}</div>
              </div>
              <div
                className="Profile-logout-link"
                href="/"
                onClick={() => {
                  firebase
                    .auth()
                    .signOut()
                    .catch(err => {
                      console.log(err);
                    });
                }}
              >
                Logout
              </div>
            </div>
          </div>
          <div className="Profile-settings">
            <div className="Profile-password-settings">
              <div className="Profile-settings-header">CHANGE PASSWORD</div>
              <div className="Profile-form-item Profile-form-item-first">
                <label className="ProfileLabel" htmlFor="current-password">
                  Current Password
                </label>
                <input
                  id="current-password"
                  type={this.state.inputTypePassword ? "password" : "text"}
                  name="current-password"
                  placeholder="Password"
                />
                <div
                  className="visibility"
                  onClick={() => this.changeInputType()}
                >
                  <img
                    alt="show/hide password"
                    src={this.state.inputTypePassword ? visible : novisible}
                  />
                </div>
              </div>
              <div className="Profile-form-item">
                <label className="ProfileLabel" htmlFor="new-password">
                  New Password
                </label>
                <input
                  id="new-password"
                  type={this.state.inputTypePassword ? "password" : "text"}
                  name="new-password"
                  placeholder="Password"
                />
                <div
                  className="visibility"
                  onClick={() => this.changeInputType()}
                >
                  <img
                    alt="show/hide password"
                    src={this.state.inputTypePassword ? visible : novisible}
                  />
                </div>
              </div>
              <div className="Profile-form-item">
                <label className="ProfileLabel" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type={this.state.inputTypePassword ? "password" : "text"}
                  name="confirm-password"
                  placeholder="Password"
                />
                <div
                  className="visibility"
                  onClick={() => this.changeInputType()}
                >
                  <img
                    alt="show/hide password"
                    src={this.state.inputTypePassword ? visible : novisible}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="Profile-settings-area">
            <div className="Profile-settings-header">SETTINGS</div>
            <div
              className="Profile-form-item Profile-form-item-first"
              // onClick={() => {
              //   let status;
              //   this,this..userStatus === "online"
              //     ? (status = "away")
              //     : (status = "online");
              //   let db = firebase.firestore();
              //   let x = db
              //     .collection("users")
              //     .doc(this.this..currentUser)
              //     .update({ userStatus: status });
              // }}
            >
              <label>Away</label>
              <label className="switch">
                <input
                  type="checkbox"
                  name="afk"
                  onChange={() => this.props.toggleAFK(this.props.currentUser)}
                />
                <span className="slider round" />
              </label>
            </div>
          </div>
          <Button
            type="filled"
            text="save"
            onClick={() => console.log("save settings")}
          />
        </div>
      </div>
    );
  }
}

export default Profile;

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  prevPage: PropTypes.string
};
