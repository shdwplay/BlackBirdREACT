import React, { Component } from "react";
import logo from "../assets/logo_welcome.png";
import "./Login.css";
import Button from "./Button";
import Modal from "./Modal";

class Login extends Component {
  state = {
    email: "",
    password: "",
    Modal: false
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
    this.setState({ Modal: false });
  }

  render() {
    return (
      <div className="Login">
        {this.state.Modal && <Modal hide={() => this.hideModal()} />}
        <div className="Login-container">
          <div className="Login-header">
            <img className="Login-mobile-logo" src={logo} />
          </div>

          <div className="Login-form">
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
              <div
                className="Login-link"
                onClick={() => {
                  console.log("forgot password");
                }}
              >
                Forgot Password?
              </div>
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
                  this.setState({ Modal: true });
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
