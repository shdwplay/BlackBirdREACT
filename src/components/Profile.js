import React from "react";
import Header from "./Header";
import Avatar from "./Avatar";
import "./Profile.css";
import novisible from "../assets/novisible.svg";
import Button from "./Button";
import logo from "../assets/logo_blackbird.svg";
import Back from "./Back";

class Profile extends React.Component {
  render() {
    return (
      <div className="Profile-container">
        <div className="ProfileHeader">
          <div className="ProfileBack">
            <Back onClick={this.props.backTo} />
          </div>
          <div>
            <img className="ProfileLogo" src={logo} />
          </div>
        </div>
        <div className="Profile-settings">
          <div className="Profile-pic">
            <Avatar size="large" />
          </div>

          <div className="Profile-logout-area">
            <div>
              <div>Antonio</div>
              <div>Pellegrini</div>
            </div>

            <a href="">Logout</a>
          </div>
        </div>
        <div>
          <h4 className="ProfileSettingsHeader">CHANGE PASSWORD</h4>

          <div className="form-item">
            <div className="ProfileLabel">
              <label htmlFor="new-password">Current Password</label>
            </div>

            <input
              id="new-password"
              type="password"
              name="new-password"
              placeholder="Password"
            />
            <div className="visibility">
              <img className="no-visibility" src={novisible} />
            </div>
          </div>
          <div className="form-item">
            <div className=" ProfileLabel">
              <label htmlFor="new-password">New Password </label>
            </div>{" "}
            <input
              id="new-password"
              type="password"
              name="new-password"
              placeholder="Password"
            />
            <div className="visibility">
              <img className="no-visibility" src={novisible} />
            </div>
          </div>
          <div className="form-item">
            <div className=" ProfileLabel">
              <label htmlFor="new-password">Confirm Password </label>
            </div>{" "}
            <input
              id="new-password"
              type="password"
              name="new-password"
              placeholder="Password"
            />
            <div className="visibility">
              <img className="no-visibility" src={novisible} />
            </div>
          </div>
        </div>
        <div>
          {" "}
          <h4 className="ProfileSettingsHeader">SETTINGS</h4>
          <div className="settings-area">
            <div className="ProfileLabel">Do not Disturb</div>

            <label className="switch">
              <input type="checkbox" />
              <span className="slider round" />
            </label>
          </div>
          <div className="button-area">
            <Button
              type="plain"
              text="save"
              onClick={() => console.log("save settings")}
            />
          </div>
        </div>
      </div> //wrapper
    );
  }
}

export default Profile;
