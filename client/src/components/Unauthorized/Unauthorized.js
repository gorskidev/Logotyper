import React, {Component} from 'react'

function Unauthorized() {
    return (
        <div>
            You must be logged in to access this website!
            <div>
                <a href="/login">Log In </a>
                <a href='/register'> Register</a>
            </div>
        </div>
    )
}

export default Unauthorized;