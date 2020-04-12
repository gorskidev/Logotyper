import React from 'react'
import './Navbar.css'


import SearchBar from '../SearchBar/SearchBar'

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <nav>
                    <a href="#" id="logo">LogoTyper</a>
                    <SearchBar />
                    <a href="#" id="addlogo">Add your logo</a>
                    <div id="menu">
                        <a href="#">Order </a>
                        <a href="#">Logo generator </a>
                        <a href="#"><Link to="/"></Link></a>
                        <a href="#">Sign Up </a>
                        <a id="signin" href="#">Sign In </a>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar
