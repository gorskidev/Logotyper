import React from 'react'

import './Header.css'

class Header extends React.Component {
    render() {
        return (
            <div id="body">
                <div id="header">
                    <h1 className="bold">Szukasz grafika czy zlecenia?</h1>
                    <h1 className="thin f-size2">Pomożemy Ci znaleźć oba.</h1>
                </div>
                <div>
                    <a href="/register" className="cta f-size1">Rejestracja</a>
                </div>
                <div id="image"></div>
            </div>
        )
    }
}

export default Header;