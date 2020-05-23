import React, {Component} from 'react'
import Unauthorized from '../Unauthorized/Unauthorized'
import axios from 'axios';

import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

        this.onClickHandler = this.onClickHandler.bind(this);
        this.onRemoveBookmarkHandler = this.onRemoveBookmarkHandler.bind(this);
    }
    
    onClickHandler(e) {
        localStorage.removeItem('jwtToken')
        window.location.href="/"
    }
    
    onRemoveBookmarkHandler(e) {
        const id = e.target.id;
        const userID = this.props.isAuthorized.id
        axios.post(`/api/removebookmark/${id}`, {userID})
        .then(res => this.setState({
            bookmarks: res.data.bookmarks
        }))
        .catch(err => console.log(err))
    }

    toUpperCaseEx(input) {
        return input.charAt(0).toUpperCase() + input.slice(1, input.length)
    }
    
    componentDidMount() {
        const id = this.props.isAuthorized.id
        fetch(`http://localhost:3001/api/getuser/${id}`)
        .then(data => data.json())
        .then(res => this.setState({
            uploads: res.data.uploads,
            bookmarks: res.data.bookmarks
        }))
    }
    
    render() {
        const {isAuthorized} = this.props
        return (
            <div className="mW-75 mT-1 center">
                <h2>
                    Hi {this.toUpperCaseEx(isAuthorized.name)}!
                </h2>
                <button onClick={this.onClickHandler}> Log out </button>
                <h2>Uploads: </h2>
                {
                    this.state.uploads ? (this.state.uploads.map(element => <img id="pic-preview" src={element.imgPath} key={element.imgPath}></img>)) : null
                }
                <h2>Bookmarks: </h2>
                {
                    this.state.bookmarks ? (this.state.bookmarks.map(element => 
                            <div key={element._id}>
                        <Link to={`/singlepost?id=${element._id}`}>
                                <img id='pic-preview' src={element.imgPath} key={element}></img>
                        </Link>
                            <a onClick={this.onRemoveBookmarkHandler} id={element._id}>Remove</a>
                            </div>
                        )) : null
                }
            </div>  
            
        )   
    }
}

export default Dashboard;