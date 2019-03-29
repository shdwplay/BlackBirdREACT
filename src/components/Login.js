import React, { Component } from "react";
import logo from "../assets/logo_welcome.svg";
import logoW from "../assets/welcome_logo_w.svg";
import "./Login.css";
import LoginForm from "./LoginForm";
import LoginForgotPsw from "./LoginForgotPsw";
import LoginPswInstructions from "./LoginPswInstructions";
import Modal from "./Modal";
import { Switch, Route } from "react-router-dom";

class Login extends Component {
  render() {
    return <Switch />;
  }
}

export default Login;
