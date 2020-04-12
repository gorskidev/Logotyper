import React from 'react'

import './Gallery.css'

import GalleryElement from '../GalleryElement/GalleryElement'
import SearchBar from '../SearchBar/SearchBar'

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
            search: ''
        }

        this.search = this.search.bind(this)
        this.filterFromGallery = this.filterFromGallery.bind(this)
        this.filterToGallery = this.filterToGallery.bind(this)
        this.setPreviousState = this.setPreviousState.bind(this)
        this.getNextElements = this.getNextElements.bind(this)
        this.getPreviousElements = this.getPreviousElements.bind(this)
        this.setFilterTo = this.setFilterTo.bind(this)
        this.setFilterFrom = this.setFilterFrom.bind(this)
    }

    search(search, filterToPrice, filterFromPrice) {
        this.setState({            
            elements: this.state.elements.map(element => element)
                .filter((element,index) => 
                    element.author.toLowerCase().includes(search.toLowerCase()) 
                    || element.title.toLowerCase().includes(search.toLowerCase()) 
                    || element.tags.includes(search) 
                    || element.tags.join('').includes(search) 
                    || (element.price > parseInt(filterFromPrice) && element.price < filterToPrice) 
                    || (element.price > filterFromPrice && element.price < parseInt(filterToPrice))
                    ),
            defaultIndex: 0,
            currentPage: 0,
            search: search
        }, () => {
            this.setState({
                lastIndex: this.state.elements.length
            })
        })

        if (!search) {
            this.setPreviousState()
        }
    }

    filterFromGallery(filterToPrice, filterFromPrice) {
        const { search } = this.state
        this.setState({
            elements: this.state.elements.map(element => element).filter(element => {
                if (!filterToPrice) {
                    filterToPrice = 9999
                }
                return (
                    (element.author.toLowerCase().includes(search.toLowerCase()) 
                    || element.title.toLowerCase().includes(search.toLowerCase()) 
                    || element.tags.includes(search) 
                    || element.tags.join('').includes(search)) 
                    && element.price > parseInt(filterFromPrice) && element.price < filterToPrice
                )
            })
        }, () => {
            this.setState({
                lastIndex: this.state.elements.length,
            })
        })
       
        if (!filterToPrice) {
            this.setPreviousState()
        }
    }
    
    filterToGallery(filterFromPrice, filterToPrice) {
        const { search } = this.state
        if (filterFromPrice < filterToPrice) {
            this.setState({
                elements: this.state.elements.map(element => element).filter(element => {
                    return (
                        (element.author.toLowerCase().includes(search.toLowerCase()) 
                        || element.title.toLowerCase().includes(search.toLowerCase()) 
                        || element.tags.includes(search) 
                        || element.tags.join('').includes(search)) 
                        && element.price > filterFromPrice && element.price < parseInt(filterToPrice)
                    ) 
                }),
            }, () => {
                this.setState({
                    lastIndex: this.state.elements.length
                })
            })
        }

        if (!filterFromPrice) {
            this.setPreviousState()
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

    setPreviousState() {
        this.setState({
            elements: this.props.elements,
            defaultIndex: 0,
            currentPage: 1
        })
    }

    getNextElements() {
        if (this.state.lastIndex > this.state.defaultIndex + this.props.defaultAmount) {
            this.setState({
                defaultIndex: this.state.defaultIndex + 8,
                currentPage: this.state.currentPage + 1
            })
        }
    }

    getPreviousElements() {
        if(this.state.defaultIndex > 1){
            this.setState({
                defaultIndex: this.state.defaultIndex - 8,
                currentPage: this.state.currentPage - 1
            })
        }
    }

    searchBarOn() {
        if (this.state.showSearchBar) {
            return (
                <SearchBar onRemove = {this.setPreviousState} 
                    onSearch = {this.search} 
                    onFilterFrom = {this.filterFromGallery} 
                    onFilterTo = {this.filterToGallery}
                    setFilterTo = {this.setFilterTo}
                    setFilterFrom = {this.setFilterFrom}
                    showFilter = {this.state.showFilter}
                    showSearchBar = {this.state.showSearchBar}
                    placeholder = {"Search for logos, authors, types, tags"}
                />
            )
        }
    }

    /*shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.elements !== this.props.elements || nextState.elements !== this.state.elements) {
            return true
        } else {
            return false
        }
    }*/

    render() {
        return (
            <div>
                {this.searchBarOn()}
                <div className="grid">
                    {
                        this.state.elements.map((element, index) => {
                            while (index >= this.state.defaultIndex && index < this.state.defaultIndex + this.props.defaultAmount) {
                                return <GalleryElement onClick={this.props.selectImg} element={element} key={element.id} />
                            }
                        })
                    }
                </div>
                <div className="controlls">
                    <button onClick={this.getPreviousElements} className="arrowButton"><FontAwesomeIcon icon='angle-left'/></button>
                    <a>Page {this.state.currentPage}</a>
                    <button onClick={this.getNextElements} className="arrowButton"><FontAwesomeIcon icon='angle-right'/></button>
                </div>
            </div>
        )
    }
}

Gallery.defaultProps = {
    showFilter: true,
    showSearchBar: true
}

export default Gallery