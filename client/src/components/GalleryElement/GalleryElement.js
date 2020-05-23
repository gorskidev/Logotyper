import React from 'react'
import axios from 'axios'

import jwt_decode from 'jwt-decode'

import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

// Utils
import {setAuthToken} from '../../util/auth'

import './GalleryElement.css'

import { IconContext } from 'react-icons';
import { FcCollaboration, FcBookmark } from "react-icons/fc";
import { AiFillDollarCircle } from "react-icons/ai";

class GalleryElement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {    
            postQueryString: "/singlepost?id=" + this.props.element._id,
            authorQueryString: "/profile?id=" + this.props.element.author_id,
            isActive: false,
            class: {
                bookmarkDSO: 'clickable',
            }
        }

        this.selectImg = this.selectImg.bind(this) 
        this.selectImgId = this.selectImgId.bind(this) 
        this.BookmarksHandler = this.BookmarksHandler.bind(this)
    }
    
    selectImg() {
        if (this.props.onClick && !this.props.showElement) {
            const amount = this.props.onClick[0]()
            this.props.onClick[0](this.props.element.imgPath)

            if (!this.state.isActive && amount < 6) {
                this.setState({
                    isActive: true
                })
            } else {
                this.setState({
                    isActive: false
                })
            }
        }
    }
    
    selectImgId() {
        if (this.props.onClick) {
            this.props.onClick[1](this.props.element._id)
        }
    }

    BookmarksHandler() {
        const bookmark = {
            ...this.props.element,
            userID: localStorage.jwtToken
        };

       // this.props.addToBookmarks(this.props.element)
        // If selected work is already in bookmarks, remove it
        if (this.props.userBookmarks.some(item => item._id == this.props.element._id)) {
            this.props.removeFromBookmarks(this.props.element._id)
            this.setState({
                class: {
                    ...this.state.class,
                    bookmarkDSO: "clickable" 
                }
            })
        } else { // Else, add it to DB.
            this.props.addToBookmarks(this.props.element)
            this.setState({
                class: {
                    ...this.state.class,
                    bookmarkDSO: "bookmarked" 
                }
            })
        }
    }
    
    isPropsOnClick() {
        if (this.props.showElement) {
            return (
                <Link to={this.state.postQueryString}> 
                    <div onClick={this.selectImg} className="frame clickable">
                        <img src={this.props.element.imgPath}></img>
                    </div> 
                </Link>
            )
        } else {
            return (
                <div onClick={() => {this.selectImg(); this.selectImgId()}} className="frame clickable">
                    <img src={this.props.element.imgPath}></img>
                </div> 
            )
        }
    }

    
    componentDidMount() {
        if (this.props.onClick[1]) {
            if (this.props.onClick[1]('noreturn').includes(this.props.element._id)) {
                this.setState({
                    isActive: true
                })
            }
        }
        
        const { userBookmarks } = this.props;
        if (userBookmarks) {
            userBookmarks.some(item => {
                if (item._id == this.props.element._id) {
                    this.setState({
                        class: {
                            ...this.state.class,
                            bookmarkDSO: "bookmarked" 
                        }
                    })
                    return
                }
            })
        } else {  // In case of memory leak, get data manually from database.
            if (localStorage.jwtToken) {
                // Set auth token header auth
                const token = localStorage.jwtToken;
                setAuthToken(token);
                // Decode token and get user info and exp
                const decoded = jwt_decode(token);
                //console.log(decoded)
                // Set user and isAuthenticated
                this.setState({
                  currentUser: decoded
                })
    
                fetch(`/api/getuser/${decoded.id}`)
                .then(data => data.json())
                .then(res => {
                    this.setState({
                        userBookmarks: res.data.bookmarks
                    })
                    this.state.userBookmarks.some(item => {
                        if (item._id == this.props.element._id) {
                            this.setState({
                                class: {
                                    ...this.state.class,
                                    bookmarkDSO: "bookmarked" 
                                }
                            })
                            return
                        }
                    })
                })
                .catch(err => console.log("Error " + err))
                //setCurrentUser(decoded);
              // Check for expired token
                const currentTime = Date.now() / 1000; // to get in milliseconds
                if (decoded.exp < currentTime) {
                  // Logout user
                  localStorage.removeItem("jwtToken");
                  setAuthToken(false);
                }
            }
        }
    }

    shouldComponentUpdate(nextState, nextProps) {
        return nextState.isActive !== this.state.isActive || nextState.postQueryString !== this.state.postQueryString 
    }

    render() {
        return (
            <div className={'galleryElement' + ' ' + (this.state.isActive ? "selectedImg" : null)}>
                {
                    this.props.hideInfo ? null 
                    : (
                        <span>
                            <a><b>{this.props.element.title}</b></a> by <Link to={this.state.authorQueryString}><b>{this.props.element.author}</b></Link>
                        </span>
                    )
                }
                {this.isPropsOnClick()}
                {
                    this.props.hideInfo ? null 
                    : (
                        <a className="f-size125">
                            <b>{this.props.element.price}</b> $
                        </a>
                    )
                } 
                <br />
                {
                    this.props.hideInfo ? null : 
                    (
                        <span>
                            <Link to={`/chat${this.state.authorQueryString}`}>
                                Connect with author
                            </Link>
                            <IconContext.Provider value = {{ style: {marginLeft: '.5rem', marginTop: '.25rem'}, size: '1.25rem' }}>
                                <FcCollaboration /> 
                            </IconContext.Provider>
                        </span>
                    )
                }
                {
                    this.props.hideInfo ? null : 
                    (
                        localStorage.jwtToken ?  (
                            <IconContext.Provider className="bookmark-icon" value = {{ size: '2rem' }}>
                                <p onClick={this.BookmarksHandler} id="addtobookmarks" className={this.state.class.bookmarkDSO}><FcBookmark/></p>
                            </IconContext.Provider>
                        ) : null
                    )
                }
            </div>
        )
    }
}

export default GalleryElement
