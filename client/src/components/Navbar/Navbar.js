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
            search: '',
            filteredElements: []
        }

        this.search = this.search.bind(this)
        this.handleAutoCompleteChange = this.handleAutoCompleteChange.bind(this)
    }

    search(search, filterToPrice, filterFromPrice) {
        this.setState({            
            filteredElements: this.state.elements.map(element => element)
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

    componentDidMount() {
        fetch('http://localhost:3001/upload/getUploads')
        .then(data => data.json())
        .then(res => {
            this.setState({
                elements: res.users,
                filteredElements: res.users
            })
        })
    }

    shouldComponentUpdate(nextProps) {
        return nextProps !== this.props
    }

    render() {
        return (
            <div>
                <nav>
                    <Link id="logo" to="/">LogoTyper</Link>
                    <SearchBar onSearch = {this.search} 
                        autocomplete = { <AutoComplete cssfixclass="navbar-autocomplete" elements={this.state.filteredElements} search={this.state.search} onClick={this.handleAutoCompleteChange}/> }
                        placeholder={"Search for logos, authors, users..."} 
                    />
                    {
                        this.props.isAuthorized ? (
                            <span>
                                <NavLink to="addyourlogo" id="addlogo">Add your logo</NavLink>
                                    <span id="menu">
                                        {/*<a href="#">Order </a>
                                        <a href="#">Logo generator </a>*/}
                                        <NavLink activeClassName="active" className="menuA" to="/order">Order</NavLink>
                                        <NavLink activeClassName="active" className="menuA" to="/orders">Orders</NavLink>
                                        <NavLink activeClassName="active" className="menuA" to="/gallery">Gallery</NavLink>
                                        <NavLink id="signin" activeClassName="active" className="menuA" to="/dashboard">Profile</NavLink>
                                    </span>
                            </span>
                        ):
                        (                        
                            <span>
                                    <span id="menu">
                                        {/*<a href="#">Order </a>
                                        <a href="#">Logo generator </a>*/}
                                        <NavLink activeClassName="active" className="menuA" to="/orders">Orders</NavLink>
                                        <NavLink activeClassName="active" className="menuA" to="/gallery">Gallery</NavLink>
                                        <NavLink activeClassName="active" className="menuA" to="/register">Sign Up</NavLink>
                                        <NavLink id="signin" activeClassName="active" className="menuA" to="/login">Sign In</NavLink>
                                    </span>
                            </span>
                        )
                    }
                </nav>
            </div>
        )
    }
}

export default Navbar
