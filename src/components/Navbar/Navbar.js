import React from 'react'
import './Navbar.css'

import {
    BrowserRouter as Router,
    Link,
    NavLink
} from "react-router-dom"

import SearchBar from '../SearchBar/SearchBar'
import AutoComplete from '../AutoComplete/AutoComplete'


class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }

        this.search = this.search.bind(this)
        this.handleAutoCompleteChange = this.handleAutoCompleteChange.bind(this)
    }

    search(search, filterToPrice, filterFromPrice) {
        this.setState({            
            elements: this.props.elements.map(element => element)
                .filter((element, index) => 
                    element.author.toLowerCase().includes(search.toLowerCase()) 
                    || element.title.toLowerCase().includes(search.toLowerCase()) 
                    || element.tags.includes(search) 
                    || element.tags.join('').includes(search) 
                    || (element.price > parseInt(filterFromPrice) && element.price < filterToPrice) 
                    || (element.price > filterFromPrice && element.price < parseInt(filterToPrice))
                    ),
            search: search
        })
    }

    handleAutoCompleteChange = e => {
        this.search(e)
    }

    render() {
        return (
            <div>
                <nav>
                    <Link id="logo" to="/">LogoTyper</Link>
                    <SearchBar onSearch = {this.search} 
                        autocomplete = { <AutoComplete cssfixclass="navbar-autocomplete" elements={this.props.elements} search={this.state.search} onClick={this.handleAutoCompleteChange}/> }
                        placeholder={"Search for logos, authors, users..."} 
                    />
                    <a href="#" id="addlogo">Add your logo</a>
                    <span id="menu">
                        {/*<a href="#">Order </a>
                        <a href="#">Logo generator </a>*/}
                        <NavLink activeClassName="bold" className="menuA" to="/order">Order</NavLink>
                        <NavLink activeClassName="bold" className="menuA" to="/gallery">Gallery</NavLink>
                        {/*<a href="#">Sign Up </a>
                        <a id="signin" href="#">Sign In </a>*/}
                    </span>
                </nav>
            </div>
        )
    }
}

export default Navbar
