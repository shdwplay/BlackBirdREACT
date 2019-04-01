import React, { Component } from "react";
import logo from "../assets/logo_welcome.svg";
import logoW from "../assets/welcome_logo_w.svg";
import "./Login.css";
import Button from "./Button";
import Modal from "./Modal";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    dbUserCredentials: [],
    Modal: false,
    forgotPassword: false,
    redirect: false
  };

  componentDidMount() {
    //simulates request for list of users and passwords from db
    setTimeout(() => {
      this.setState({
        dbcredentials: [
          ["antoniopellegrini@born2code.it", "pippo"],
          ["carlburns@born2code.it", "fidelio"]
        ]
      });
    }, 2000); //*ISSUE IF USER ATTEMPS LOGIN BEFORE REQUEST IS FINISHED*
  }
  inputVerification = (name, pw) => {
    let userExists = this.state.dbcredentials.map(el => el[0]).indexOf(name);
    console.log(userExists);
    if (userExists === -1) {
      console.log("user not found");
      return false;
    }
    if (
      !(
        name === this.state.dbcredentials[userExists][0] &&
        pw === this.state.dbcredentials[userExists][1]
      )
    ) {
      console.log("incorrect password");
      return false;
    }
    console.log(name + " " + pw);
    return true;
  };

  hideModal() {
    this.setState({ Modal: false });
  }

  render() {
    if (this.state.redirect) {
      var user = this.state.email.split("@")[0];
      return <Redirect to={"/messages/" + user} />;
    }
    if (!this.state.forgotPassword) {
      return (
        <div className="Login">
          {this.state.Modal && <Modal hide={() => this.hideModal()} />}
          <div className="Login-container">
            <div className="Login-header">
              <img
                alt="BlackBird Logo"
                className="Login-mobile-logo"
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
                onClick={() => {
                  if (
                    this.inputVerification(
                      this.state.email,
                      this.state.password
                    )
                  ) {
                    this.setState({ redirect: true });
                  } else this.setState({ Modal: true });
                }}
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
