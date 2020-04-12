import React from 'react'

import './Header.css'

class Header extends React.Component {
    render() {
        return (
            <div id="body">
                <div id="header">
                    <h1 className="bold">LogoTyper is not only a logo generator,</h1>
                    <h1 className="thin">it's the easiest way to show your style.</h1>
                </div>
                <div>
                    <a className="cta">Ready?  &nbsp; - &nbsp; Start now</a>
                </div>
                <div id="image"></div>
            </div>
        )
    }
}

export default Header;