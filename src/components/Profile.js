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
import firebase from "../firebase";
import FileInput from "react-file-input";

class Profile extends React.Component {
  state = {
    inputTypePassword: true
  };

  onChange({ value }) {
    const { input } = this.props;
    input.onChange(value);
    console.log(value);
  }
  changeInputType() {
    this.setState({ inputTypePassword: !this.state.inputTypePassword });
  }
  render() {
    const { input, label } = this.props;
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
          <FileInput
            label="Awesome Uploader"
            onChangeCallback={this.onChange}
            onDragEnterCallback={input.onFocus}
            onDragLeaveCallback={input.onBlur}
          />
        </div>
        <div className="Profile-container">
          <div className="Profile-pic-and-logout-area">
            <div className="Profile-pic">
              <Avatar size="large" name={this.props.currentUser} />
            </div>
            <div className="Profile-logout-area">
              <div className="Profile-data">
                <div className="profile-user-name">
                  {this.props.currentUser}
                </div>
              </div>
              <div
                className="Profile-logout-link"
                href="/"
                onClick={() => {
                  firebase
                    .auth()
                    .signOut()
                    .catch(function(error) {
                      // An error happened.
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
            <div className="Profile-settings-area">
              <div className="Profile-settings-header">SETTINGS</div>
              <div className="Profile-form-item Profile-form-item-first">
                <label>Away</label>
                <label className="switch">
                  <input type="checkbox" name="afk" />
                  <span className="slider round" />
                </label>
              </div>
            </div>
          </div>
          <Button
            type="plain"
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
