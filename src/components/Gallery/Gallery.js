import React from 'react'

import './Gallery.css'

import GalleryElement from '../GalleryElement/GalleryElement'
import SearchBar from '../SearchBar/SearchBar'
import AutoComplete from '../AutoComplete/AutoComplete'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Gallery extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showFilter: this.props.showFilter,
            showSearchBar: this.props.showSearchBar,
            elements: this.props.elements,
            filterTo: '',
            filterFrom: '',
            defaultIndex: 0,
            lastIndex: this.props.elements.length,
            currentPage: 1,
            search: '',
        }

        this.search = this.search.bind(this)
        this.filterFromGallery = this.filterFromGallery.bind(this)
        this.filterToGallery = this.filterToGallery.bind(this)
        this.getNextElements = this.getNextElements.bind(this)
        this.getPreviousElements = this.getPreviousElements.bind(this)
        this.setFilterTo = this.setFilterTo.bind(this)
        this.setFilterFrom = this.setFilterFrom.bind(this)
        this.handleAutoCompleteChange = this.handleAutoCompleteChange.bind(this)
    }

    search(search, filterToPrice, filterFromPrice) {
        this.setState({            
            elements: this.props.elements.map(element => element)
                .filter((element,index) => 
                    element.author.toLowerCase().includes(search.toLowerCase()) 
                    || element.title.toLowerCase().includes(search.toLowerCase()) 
                    || element.tags.includes(search) 
                    || element.tags.join('').includes(search) 
                    || (element.price > parseInt(filterFromPrice) && element.price < filterToPrice) 
                    || (element.price > filterFromPrice && element.price < parseInt(filterToPrice))
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
            elements: this.props.elements.map(element => element).filter(element => {
                if (!filterToPrice) {
                    filterToPrice = 9999
                } else if (!filterFromPrice) {
                    filterFromPrice = 9999
                }
                
                return (
                    (element.author.toLowerCase().includes(search.toLowerCase()) 
                    || element.title.toLowerCase().includes(search.toLowerCase()) 
                    || element.tags.includes(search) 
                    || element.tags.join('').includes(search)) 
                    && element.price > parseInt(filterFromPrice) && element.price < filterToPrice
                )
                
            }),
            defaultIndex: 0,
            currentPage: 1,
        }, () => {
            this.setState({
                lastIndex: this.state.elements.length,
            }, () => {
                this.resetArrows()
            })
        })
    }
    
    filterToGallery(filterFromPrice, filterToPrice) {
        const { search } = this.state
        if (filterFromPrice < filterToPrice) {
            this.setState({
                elements: this.props.elements.map(element => element).filter(element => {
                    return (
                        (element.author.toLowerCase().includes(search.toLowerCase()) 
                        || element.title.toLowerCase().includes(search.toLowerCase()) 
                        || element.tags.includes(search) 
                        || element.tags.join('').includes(search)) 
                        && element.price > filterFromPrice && element.price < parseInt(filterToPrice)
                    ) 
                }),
                defaultIndex: 0,
                currentPage: 1
            }, () => {
                this.setState({
                    lastIndex: this.state.elements.length
                }, () => {
                    this.resetArrows()
                })
            })
        }
    }

    setFilterTo(value) {
        this.setState({
            filterTo: value
        })
    }

    setFilterFrom(value) {
        this.setState({
            filterFrom: value
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
        if(this.state.defaultIndex > 1){
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
                    setFilterTo = {this.setFilterTo}
                    setFilterFrom = {this.setFilterFrom}
                    showFilter = {this.state.showFilter}
                    showSearchBar = {this.state.showSearchBar}
                    placeholder = {"Search for logos, authors, types, tags"}
                    elements = {this.props.elements}
                    autocomplete = { <AutoComplete elements={this.props.elements} search={this.state.search} onClick={this.handleAutoCompleteChange}/> }
                />
            )
        }
    }

    results() {
        const { elements, defaultIndex } = this.state
        const { defaultAmount, selectImg } = this.props
        if(elements.length > 0) {
            return (
                <div className="grid">
                {
                    elements.map((element, index) => {
                        if (index >= defaultIndex && index < defaultIndex + defaultAmount) {
                            return <GalleryElement onClick={selectImg} element={element} key={element.id} />
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

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState !== this.state)
    }

    render() {
        const { currentPage, isLeftArrowVisible, isRightArrowVisible } = this.state
        return (
            <div>
                {this.searchBarOn()}

                {this.results()}
                {/*<div className="grid">
                    {
                        elements.map((element, index) => {
                            if (index >= defaultIndex && index < defaultIndex + defaultAmount) {
                                return <GalleryElement onClick={selectImg} element={element} key={element.id} />
                            }
                        })
                    }
                </div>*/}
                <div className="controlls">
                    <button onClick={this.getPreviousElements} className={isLeftArrowVisible ? "arrowButton" : "blocked arrowButton"}><FontAwesomeIcon icon='angle-left'/></button>
                    <a>Page {currentPage}</a>
                    <button onClick={this.getNextElements} className={isRightArrowVisible ? "arrowButton" : "blocked arrowButton"}><FontAwesomeIcon icon='angle-right'/></button>
                </div>
                {/*<AutoComplete elements={this.props.elements} search={this.state.search}/> */}
            </div>
        )
    }
}

Gallery.defaultProps = {
    showFilter: true,
    showSearchBar: true
}

export default Gallery