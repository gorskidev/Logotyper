import React, {Component} from 'react'
import axios from 'axios'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            email: null,
            password: null,
            password2: null
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const {name, email, password, password2} = this.state;
        const userData = {
            name,
            email,
            password,
            password2
        }
        axios.post('/api/register', userData)
        .then(res => {
            console.log(res)
            window.location.href="/login"    
        })
        .catch(err => {
            console.log(err.response)
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
                <h2 className="mB-3">Register</h2>
                <form noValidate onSubmit={this.onSubmitHandler} >
                    <input className="auth mT-3"
                        type="text"
                        id="name"
                        onChange={this.onChangeHandler} 
                        onFocus={this.onFocusHandler}
                        onBlur={this.onBlurHandler}
                        />
                    <label htmlFor="name">
                        Name
                    </label>
                    <a style={{top: '0rem !important', color: 'red', fontWeight: '600'}}>
                        {this.state.errors ? this.state.errors.name : null}
                    </a>
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
                    <input className="auth mT-3" 
                        type="password"
                        id="password2"
                        onChange={this.onChangeHandler}
                        onFocus={this.onFocusHandler}
                        onBlur={this.onBlurHandler}
                    />
                    <label htmlFor="password2">
                        Confirm your password
                    </label>
                    <a style={{top: '0rem !important', color: 'red', fontWeight: '600'}}>
                        {this.state.errors ? this.state.errors.password2  : null}
                    </a>
                    <div style={{margin: '1rem 0'}}>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register;