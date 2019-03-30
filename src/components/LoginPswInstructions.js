import React from "react";
import "./LoginPswInstructions.css";
import Button from "./Button";
import logo from "../assets/logo_welcome.svg";
import logoW from "../assets/welcome_logo_w.svg";

class LoginPswInstructions extends React.Component {
  render() {
    return (
      <div className="Login">
        <div className="Login-container">
          <div className="Login-header">
            <img
              alt="BlackBird Logo"
              class="Logo-ipad Login-mobile-logo"
              src={logoW}
            />
            <img
              alt="BlackBird Logo"
              class="Logo-mobile Login-mobile-logo"
              src={logo}
            />
          </div>
          <div className="Login-form">
            <div className="Login-Login">
              <div className="Login-title-form">
                For instructions to change
                <br />
                your password please check
                <br />
                your company email inbox
              </div>
              <Button text="Return to Login" type="filled" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPswInstructions;
