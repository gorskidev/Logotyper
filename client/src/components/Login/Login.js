import React, {Component} from 'react';
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import {setAuthToken} from '../../util/auth'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: null,
            password: null,
            errors: null
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmitHandler = e => {
        e.preventDefault()
        const { email, password } = this.state
        const UserData = {
            email,
            password
        }
        axios.post('/api/login', UserData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            window.location.href="/"
          })
        .catch(err => {
            this.setState({
                errors: err.response.data
            })
        })
    }

    onFocusHandler(e) {
        const id = e.target.id
        document.querySelector(`[for=${id}]`).className = "focusedLabel"
        document.querySelector(`#${id}`).className+= " focusedInput"
    }

    onBlurHandler(e) {
        const id = e.target.id
        if (!this.state[e.target.id]) {
            document.querySelector(`[for=${id}]`).className = ""
        }
        document.querySelector(`#${id}`).className = "auth mT-3"
    }

    render() {
        return (
            <div className="mW-25 center mT-1 mB-3">
                <h2 className="mB-3">Login</h2>
                <form noValidate onSubmit={this.onSubmitHandler} >
                    <input className="auth mT-3"
                        type="email"
                        id="email"
                        onChange={this.onChangeHandler} 
                        onFocus={this.onFocusHandler}
                        onBlur={this.onBlurHandler}
                        />
                    <label htmlFor="email">
                        Email
                    </label>
                    <a style={{top: '0rem !important', color: 'red', fontWeight: '600'}}>
                        {this.state.errors ? this.state.errors.email : null}
                    </a>
                    <input className="auth mT-3"
                        type="password"
                        id="password"
                        onChange={this.onChangeHandler}
                        onFocus={this.onFocusHandler}
                        onBlur={this.onBlurHandler}
                        />
                    <label htmlFor="password">         
                        Password
                    </label>
                    <a style={{top: '0rem !important', color: 'red', fontWeight: '600'}}>
                        {this.state.errors ? this.state.errors.password : null}
                    </a>
                    <div style={{margin: '1rem 0'}}>
                        <button type="submit">Login</button>
                    </div>
                    <a style={{top: '0rem !important', color: 'red', fontWeight: '600'}}>
                        {this.state.errors ? this.state.errors.emailnotfound : null}
                        {this.state.errors ? this.state.errors.passwordIncorrect : null}
                    </a>
                </form>
            </div>
        )
    }
}

export default Login;