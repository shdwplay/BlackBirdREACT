import React, { Component } from "react";
import logo from "../assets/logo_welcome.svg";
import logoW from "../assets/welcome_logo_w.svg";
import "./Login.css";
import Button from "./Button";
import Modal from "./Modal";
import { Redirect, Link, withRouter, Route } from "react-router-dom";
import firebase from "../firebase";
import Messages from "./Messages";
import { showSpinner } from "../utils";
import { logIn } from "../api";
import { getUserInfo } from "../api";
import { listenCollocutorsList } from "../api";
import "../spinner.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    modal: false,
    forgotPassword: false,
    redirect: false,
    loading: false
  };

  hideModal() {
    this.setState({ modal: false });
  }

  render() {
    if (this.state.loading) return showSpinner();
    if (!this.state.forgotPassword) {
      return (
        <div className="Login">
          {this.state.modal && (
            <Modal
              alertTitle="Invalid email or password"
              alertText="Please reinsert both fields carefully"
              hide={() => this.hideModal()}
            />
          )}
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
              <div className="Login-form-item">
                <label className="Login-label" htmlFor="Login-input-email">
                  Company Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={evt => this.setState({ email: evt.target.value })}
                  className="Login-form-control"
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
                  onChange={evt =>
                    this.setState({ password: evt.target.value })
                  } //is this bad??
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
                    this.setState({ forgotPassword: true });
                  }}
                >
                  Forgot Password?
                </div>
              </div>
              <Button
                text="Login"
                type="filled"
                onClick={() =>
                  logIn(this.state.email, this.state.password).then(x =>
                    getUserInfo(x.user.email.split("@")[0], x => {
                      console.log(x);
                      this.props.setstate({
                        currentUser: x.email.split("@")[0]
                      });
                    }).then(() => {
                      listenCollocutorsList(x.user.email.split("@")[0], x =>
                        this.props.setstate({ collocutors: x })
                      );
                      this.props.setAuthenticated();
                      console.log(x);
                    })
                  )
                }
              />
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div className="Login-PasswordContainer">
          <div className="Login-forgot">Forgot Password?</div>
          <div className="Login-instructions">
            Enter your company email address to <br />
            receive instructions for recovery.
          </div>
          <br />
          <br />
          <div className="Login-forgotInputArea">
            <div>Company email address</div>
            <input className="Login-forgotInput" type="email" />
          </div>

          <Button
            text="submit"
            type="plain"
            onClick={() => this.props.setCredentials}
          />
        </div>
      );
  }
}

export default Login;
