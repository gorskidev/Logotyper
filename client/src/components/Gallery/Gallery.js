import React from 'react'

import './Gallery.css'

import GalleryElement from '../GalleryElement/GalleryElement'
import SearchBar from '../SearchBar/SearchBar'
import AutoComplete from '../AutoComplete/AutoComplete'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Utils
import {setAuthToken} from '../../util/auth'

// Dependencies 
import jwt_decode from 'jwt-decode'
import axios from 'axios'

class Gallery extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showFilter: this.props.showFilter,
            showSearchBar: this.props.showSearchBar,
            elements: [],
            filteredElements: '',
            filterTo: '',
            filterFrom: '',
            defaultIndex: 0,
            currentPage: 1,
            search: ''
        }

        this.search = this.search.bind(this)
        this.filterFromGallery = this.filterFromGallery.bind(this)
        this.filterToGallery = this.filterToGallery.bind(this)
        this.getNextElements = this.getNextElements.bind(this)
        this.getPreviousElements = this.getPreviousElements.bind(this)
        this.setFilterTo = this.setFilterTo.bind(this)
        this.setFilterFrom = this.setFilterFrom.bind(this)
        this.handleAutoCompleteChange = this.handleAutoCompleteChange.bind(this)
        this.addToBookmarks = this.addToBookmarks.bind(this)
        this.removeFromBookmarks = this.removeFromBookmarks.bind(this)
    }

    search(search, filterToPrice, filterFromPrice) {
        if (filterFromPrice === '' || filterFromPrice === 'undefined') {
            filterFromPrice = 0
        }

        if (filterToPrice === '' || filterToPrice === 'undefined') {
            filterToPrice = Math.pow(999, 2)
        }

        this.setState({            
            filteredElements: this.state.elements.map(element => element)
                .filter((element,index) => 
                    (element.author.toLowerCase().includes(search.toLowerCase()) 
                    || element.title.toLowerCase().includes(search.toLowerCase()) 
                    || element.tags.includes(search) 
                    || element.tags.join('').includes(search)) 
                    && (element.price >= parseInt(filterFromPrice) && element.price <= parseInt(filterToPrice)) 
                    ),
            defaultIndex: 0,
            currentPage: 1,
            search: search
        }, () => {
            this.setState({
                lastIndex: this.state.elements.length,
            }, () => {
                this.resetArrows()
            })  
        })
    }

    resetArrows() {
        this.setState({
            isRightArrowVisible: (this.state.lastIndex > this.state.defaultIndex + this.props.defaultAmount) ? true : false,
            isLeftArrowVisible: false
        })
    }

    filterFromGallery(filterToPrice, filterFromPrice) {
        const { search } = this.state
        this.setState({
            filteredElements: this.state.elements.map(element => element).filter(element => {
                if (!filterToPrice) {
                    filterToPrice = 9999
                } else if (!filterFromPrice || filterFromPrice == ' ') {
                    filterFromPrice = 0
                }
                
                return (
                    (element.author.toLowerCase().includes(search.toLowerCase()) 
                    || element.title.toLowerCase().includes(search.toLowerCase()) 
                    || element.tags.includes(search) 
                    || element.tags.join('').includes(search)) 
                    && element.price >= parseInt(filterFromPrice) && element.price <= parseInt(filterToPrice)
                )
            }),
            defaultIndex: 0,
            currentPage: 1
        }, () => {
            this.setState({
                lastIndex: this.state.elements.length,
            }, () => {
                this.resetArrows();
            })
        })
    }
    
    filterToGallery(filterFromPrice, filterToPrice) {
        const { search } = this.state

        if (filterFromPrice === '' || filterFromPrice === 'undefined') {
            filterFromPrice = 0
        }

        if (filterToPrice > filterFromPrice && !isNaN(filterToPrice)) {
            this.setState({
                filteredElements: this.state.elements.map(element => element).filter(element => {
                    return (
                        (element.author.toLowerCase().includes(search.toLowerCase()) 
                        || element.title.toLowerCase().includes(search.toLowerCase()) 
                        || element.tags.includes(search) 
                        || element.tags.join('').includes(search)) 
                        && element.price >= parseInt(filterFromPrice) && element.price <= parseInt(filterToPrice)
                    )
                }),
                defaultIndex: 0,
                currentPage: 1
            }, () => {
                this.setState({
                    lastIndex: this.state.elements.length
                }, () => {
                    this.resetArrows();
                })
            })
        }
    }
    
    setFilterFrom(value) {
        this.setState({
            filterFrom: value
        })
    }

    setFilterTo(value) {
        this.setState({
            filterTo: value
        })
    }

    getNextElements() {
        if (this.state.lastIndex > this.state.defaultIndex + this.props.defaultAmount) { 
            this.setState({
                isRightArrowVisible: true,
                isLeftArrowVisible: true,
                defaultIndex: this.state.defaultIndex + this.props.defaultAmount,
                currentPage: this.state.currentPage + 1
            }, () => {
                if(!(this.state.lastIndex > this.state.defaultIndex + this.props.defaultAmount)){
                    this.setState({
                        isRightArrowVisible: false
                    })
                }
            })
        }
    }

    getPreviousElements() {
        if (this.state.defaultIndex > 1) {
            this.setState({
                isLeftArrowVisible: true,
                isRightArrowVisible: true,
                defaultIndex: this.state.defaultIndex - this.props.defaultAmount,
                currentPage: this.state.currentPage - 1
            }, () => {
                if (!(this.state.defaultIndex > 1)) {
                    this.setState({
                        isLeftArrowVisible: false
                    })
                }
            })
        }
    }

    handleAutoCompleteChange = e => {
        this.search(e)
    }

    searchBarOn() {
        if (this.state.showSearchBar) {
            return (
                <SearchBar onSearch = {this.search} 
                    onFilterFrom = {this.filterFromGallery} 
                    onFilterTo = {this.filterToGallery}
                    setFilterFrom = {this.setFilterFrom}
                    setFilterTo = {this.setFilterTo}
                    showFilter = {this.state.showFilter}
                    showSearchBar = {this.state.showSearchBar}
                    placeholder = {"Search for logos, authors, types, tags"}
                    elements = {this.state.filteredElements}
                    autocomplete = { <AutoComplete elements={this.state.filteredElements} search={this.state.search} onClick={this.handleAutoCompleteChange}/> }
                />
            )
        }
    }

    addToBookmarks(propsElement) {
        const bookmark = {
            ...propsElement,
            userID: localStorage.jwtToken
        };

        axios.post('/api/addtobookmarks', bookmark)
        .then(res => this.setState({
            userBookmarks: res.data.bookmarks
        }));
    }

    removeFromBookmarks(propsElement) {
        const userID = this.state.currentUser.id
        axios.post(`/api/removebookmark/${propsElement}`, {userID})
        .then(res => this.setState({
            userBookmarks: res.data.bookmarks
        }))
        .catch(err => console.log(err.response))
    }

    results() {
        const { filteredElements, defaultIndex } = this.state
        const { defaultAmount, selectImg, selectImgId } = this.props
        const elements = filteredElements
        if(elements.length > 0) {
            return (
                <div className="grid">
                {
                    elements.map((element, index) => {
                        if (index >= defaultIndex && index < defaultIndex + defaultAmount) {
                            return <GalleryElement onClick={[selectImg, selectImgId]} removeFromBookmarks={this.removeFromBookmarks} addToBookmarks={this.addToBookmarks} currentUser={this.state.currentUser} userBookmarks={this.state.userBookmarks} showElement={this.props.showElement} hideInfo={this.props.hideInfo} element={element} key={element._id} />
                        }
                    })
                }
            </div>
            )
        } else {
            return (
                <div className="results">
                    <a>No results for "<b>{this.state.search}</b>"</a>
                </div>
            )
        }
    }

    componentWillMount() {
        this.setState({
            isRightArrowVisible: (this.state.lastIndex > this.state.defaultIndex + this.props.defaultAmount),
            isLeftArrowVisible: (this.state.defaultIndex > 1)
        })
    }

    componentDidMount() {
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

        fetch('/upload/getUploads')
        .then(data => data.json())
        .then(res => {
            this.setState({
                elements: res.users,
                filteredElements: res.users,
                lastIndex: res.users.length,
            }, () => {
                this.resetArrows()}
            )
        })
    }

    render() {
        const { currentPage, isLeftArrowVisible, isRightArrowVisible } = this.state
        return (
            <div>
                {this.searchBarOn()}
                {this.results()}
                <div className="controlls">
                    <button onClick={this.getPreviousElements} className={isLeftArrowVisible ? "arrowButton" : "blocked arrowButton"}><FontAwesomeIcon icon='angle-left'/></button>
                    <a>Page {currentPage}</a>
                    <button onClick={this.getNextElements} className={isRightArrowVisible ? "arrowButton" : "blocked arrowButton"}><FontAwesomeIcon icon='angle-right'/></button>
                </div>
            </div>
        )
    }
}

Gallery.defaultProps = {
    showFilter: true,
    showSearchBar: true,
    showElement: true
}

export default Gallery