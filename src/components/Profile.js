import React from "react";
import Avatar from "./Avatar";
import "./Profile.css";
import novisible from "../assets/novisible.svg";
import Button from "./Button";
import logo from "../assets/logo_blackbird.svg";
import Back from "./Back";

class Profile extends React.Component {
  render() {
    return (
      <div>
        <div className="ProfileHeader">
          <div className="ProfileBack">
            <Back onClick={this.props.backTo} />
          </div>
          <div className="ProfileLogo">
            <img alt="BlackBird Logo" src={logo} />
          </div>
        </div>
        <div className="Profile-container">
          <div className="Profile-pic-and-logout-area">
            <div className="Profile-pic">
              <Avatar size="large" name="Edoardo Accivile"/>
            </div>
            <div className="Profile-logout-area">
              <div className="Profile-data">
                <div className="profile-user-name">Antonio</div>
                <div className="profile-user-lastname">Pellegrini</div>
              </div>
              <a className="Profile-logout-link" href="/">Logout</a>
            </div>
          </div>
          <div className="Profile-settings">
            <div className="Profile-password-settings">
              <div className="Profile-settings-header">CHANGE PASSWORD</div>
              <div className="Profile-form-item Profile-form-item-first">
                <label className="ProfileLabel" htmlFor="current-password">Current Password</label>
                <input id="current-password" type="password" name="current-password" placeholder="Password" />
                <div className="visibility">
                  <img alt="show/hide password" className="no-visibility" src={novisible} />
                </div>
              </div>
              <div className="Profile-form-item">
                <label className="ProfileLabel" htmlFor="new-password">New Password</label>
                <input id="new-password" type="password" name="new-password" placeholder="Password" />
                <div className="visibility">
                  <img  alt="show/hide password" className="no-visibility" src={novisible} />
                </div>
              </div>
              <div className="Profile-form-item">
                <label className="ProfileLabel" htmlFor="confirm-password">Confirm Password</label>
                <input id="confirm-password" type="password" name="confirm-password" placeholder="Password" />
                <div className="visibility">
                  <img  alt="show/hide password" className="no-visibility" src={novisible} />
                </div>
              </div>
            </div>
            <div className="Profile-settings-area">
              <div className="Profile-settings-header">SETTINGS</div>
              <div className="Profile-form-item Profile-form-item-first">
                <label>Away</label>
                <label className="switch">
                  <input type="checkbox" name="afk"/>
                  <span className="slider round"></span>
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
