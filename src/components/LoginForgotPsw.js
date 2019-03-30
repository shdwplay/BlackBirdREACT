import React, { Component } from "react";
import "./LoginForgotPsw.css";
import Button from "./Button";
import Modal from "./Modal";
import logo from "../assets/logo_welcome.svg";
import logoW from "../assets/welcome_logo_w.svg";

class LoginForgotPsw extends Component {
  state = {
    email: "",
    password: "",
    isModalVisible: false,
    forgotPassword: false
  };

  inputVerification = (name, pw) => {
    //check for user in db + return user credentials
    const credentials = ["1", "1"];
    console.log(name + " " + pw);
    if (name === credentials[0] && pw === credentials[1]) {
      this.setState({
        email: name,
        password: pw
      });
      return true;
    } else {
      return false;
    }
  };

  hideModal() {
    this.setState({ isModalVisible: false });
  }
  render() {
    return (
      <div className="Login">
        {this.state.isModalVisible && <Modal hide={() => this.hideModal()} />}
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
              <div className="Login-title-form">Forgot Password?</div>
              <div className="Login-text-form">
                Enter your company email address to
                <br />
                receive instructions for recovery.
              </div>
              <div className="Login-form-item">
                <label className="Login-label" for="InputEmail">
                  Company Email Address
                </label>
                <input
                  type="email"
                  className="Login-form-control"
                  id="InputEmail"
                  aria-describedby="emailHelp"
                  placeholder="you@company.com"
                />
              </div>
              <Button text="Submit" type="filled" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForgotPsw;
