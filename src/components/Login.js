import React, { Component } from 'react'
import logo from '../assets/logo_welcome.png'
import './Login.css'


class Login extends Component {
    state={
        email:'',
        password:''
    }

    inputVerification = (name, pw) =>{
        //check for user in db + return user credentials
        const credentials= ['pippo','123']
        if(name===credentials[0] && pw===credentials[1]){
            console.log('login success')
            this.setState({
                email:name,
                password:pw
            })
        }
        else {
            console.log('login fail')
            alert('Invalid email or password')
        }
    }

    render(){
        return(
            <div className="Login">
                <div className="Login-container">
                    <div className="Login-header">
                        <img className="Login-mobile-logo" src={logo}/>
                    </div>
            
                    <div className="Login-form">
                        <div className="Login-form-item">
                            <label className="Login-label" htmlFor="Login-input-email">Company Email Address</label>
                            <input type="email" name="email" className="Login-form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="you@company.com"/>
                        </div>
                        <div className="Login-form-item">
                            <label className="Login-label" htmlFor="InputPassword">Password</label>
                            <input type="password" name="password" className="Login-form-control" id="InputPassword" placeholder="Your Password"/>
                        </div>
                        <div className="Login-form-item Login-form-check">
                            <input type="checkbox" name="checkbox" className="Login-form-check" id="remember-me"/>
                            <label className="Login-label" htmlFor="remember-me">Remember Me</label>
                        </div>
                        <div className="Login-form-item Login-form-forgot">
                            <div className="Login-link" 
                                onClick={()=>{
                                    console.log('forgot password')
                                }
                            }>Forgot Password?</div>
                        </div>
                        <input type="button" className="Login-button" value="Login" 
                            onClick={()=> {
                                let inputEmail=document.getElementById('InputEmail')
                                let inputPassword=document.getElementById('InputPassword')
                                console.log('email: ' + inputEmail.value)
                                console.log('password:' + inputPassword.value)
                                this.inputVerification(inputEmail.value,inputPassword.value)                              
                                }
                            }/>
                    </div>
                </div>
             </div>
        )
    }
}

export default Login