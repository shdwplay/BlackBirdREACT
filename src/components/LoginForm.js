import React, { Component } from "react";
import "./LoginForm.css";
import Button from "./Button";
import Modal from "./Modal";
import logo from "../assets/logo_welcome.svg";
import logoW from "../assets/welcome_logo_w.svg";
import { Link } from "react-router-dom";

class LoginForm extends Component {
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
              className="Logo-ipad Login-mobile-logo"
              src={logoW}
            />
            <img
              alt="BlackBird Logo"
              className="Logo-mobile Login-mobile-logo"
              src={logo}
            />
          </div>

          <div className="Login-form">
            <div className="Login-Login">
              <div className="Login-form-item">
                <label className="Login-label" htmlFor="Login-input-email">
                  Company Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="Login-form-control"
                  id="InputEmail"
                  aria-describedby="emailHelp"
                  placeholder="you@company.com"
                />
              </div>
              <div className="Login-form-item">
                <label className="Login-label" htmlFor="InputPassword">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="Login-form-control"
                  id="InputPassword"
                  placeholder="Your Password"
                />
              </div>
              <div className="Login-form-item Login-form-check">
                <input
                  type="checkbox"
                  name="checkbox"
                  className="Login-form-check"
                  id="remember-me"
                />
                <label className="Login-label" htmlFor="remember-me">
                  Remember Me
                </label>
              </div>

              <div className="Login-form-item Login-form-forgot">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <Button
                text="Login"
                type="filled"
                function={() => {
                  let email = document.getElementById("InputEmail").value;
                  let password = document.getElementById("InputPassword").value;
                  if (this.inputVerification(email, password))
                    this.props.function();
                  else {
                    this.setState({ isModalVisible: true });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
