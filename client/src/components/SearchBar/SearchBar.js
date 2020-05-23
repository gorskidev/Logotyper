import React from 'react'
import ReactDOM from 'react-dom'

import AutoComplete from '../AutoComplete/AutoComplete'

import './SearchBar.css'

class SearchBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userInput: '',
            filterFrom: '',
            filterTo: '',
            undefinedFilterTo: 10000,
            showAutoComplete: false
        }

        this.filterFromHandleOnChange   = this.filterFromHandleOnChange.bind(this)
        this.filterToHandleOnChange     = this.filterToHandleOnChange.bind(this)
        this.onChange                   = this.handleOnChange.bind(this)
        this.searchBarOnKeyDown         = this.searchBarOnKeyDown.bind(this)
        this.filterOnKeyDown            = this.filterOnKeyDown.bind(this)
        this.onClickHandler             = this.onClickHandler.bind(this)
        this.handleClickOutside         = this.handleClickOutside.bind(this)
    }

    filterOn() {
        if (this.props.showFilter) {
            if (this.props.onFilterFrom && this.props.onFilterTo) {
                return (
                    <span>
                        <input className="filterInput" type="text" value={this.state.filterFrom} onKeyDown={this.filterOnKeyDown} onChange={this.filterFromHandleOnChange} placeholder="Price from" />
                        <input className="filterInput" type="text" value={this.state.filterTo} onKeyDown={this.filterOnKeyDown} onChange={this.filterToHandleOnChange} placeholder="Price to" />
                    </span>
                )
            } else if (this.props.onFilterFrom && !this.props.onFilterTo) {
                return (
                    <span>
                        <input className="filterInput" type="text" value={this.state.filterFrom} onKeyDown={this.filterOnKeyDown} onChange={this.filterFromHandleOnChange} placeholder="Price from" />
                    </span>
                )
            } else if (!this.props.onFilterFrom && this.props.onFilterTo) {
                return (
                    <span>
                        <input className="filterInput" type="text" value={this.state.filterTo} onKeyDown={this.filterOnKeyDown} onChange={this.filterToHandleOnChange} placeholder="Price to" />
                    </span>
                )
            }
        }
    }

    filterFromHandleOnChange = e => {
        if(!isNaN(e.target.value)){
            this.setState({
                filterFrom: e.target.value
            }, () => {
                this.props.setFilterFrom(parseInt(this.state.filterFrom))
                this.filterFrom()
            })
        }
    }

    filterToHandleOnChange = e => {
        if(!isNaN(e.target.value)){
            this.setState({
                filterTo: e.target.value
            }, () => {
                this.props.setFilterTo(parseInt(this.state.filterTo))
                this.filterTo()
            })
        }
    }


    handleOnChange = e => {
        this.setState({
            userInput: e.target.value,
            showAutoComplete: true
        }, () => {
            return (
                this.props.onSearch ? this.search() : null
            )
        })
    }

    searchBarOnKeyDown = e => {
        if (e.keyCode == 27) {
            this.setState({
                showAutoComplete: false
            })
        }
    }

    filterOnKeyDown = e => {
        if (e.keyCode == 32) {
            e.preventDefault()
        }

        if(e.keyCode === 8) {
            if(this.state.filterTo < 10){
                this.props.setFilterTo(parseInt(9999))
                this.filterTo(9999)
            }
        }
    }

    onClickHandler = e => {
        if (!this.state.showAutoComplete) {
            this.setState({
                showAutoComplete: true
            })
        } else {
            this.setState({
                showAutoComplete: false
            })
        }
    }
    
    search() {
        this.props.onSearch(this.state.userInput, this.state.filterTo, this.state.filterFrom)
    }
    
    filterFrom() {
        this.props.onFilterFrom(this.state.filterTo, this.state.filterFrom)
    }
    
    filterTo(addParam) {
        if (this.state.filterTo >= this.state.filterFrom) {
            if(addParam){
                this.props.onFilterTo(this.state.filterFrom, addParam)
            } else {
                this.props.onFilterTo(this.state.filterFrom, this.state.filterTo)
            }
        }
    }
    
    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }
    
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }
    
    handleClickOutside = event => {
        const domNode = ReactDOM.findDOMNode(this);
        if (!domNode || !domNode.contains(event.target)) {
            this.setState({
                showAutoComplete: false
            });
        } else if (domNode.contains(event.target)) {
            setTimeout(() => {this.setState({showAutoComplete: false})}, 0)
        }
    }

    showAutoComplete() {
        if (this.state.showAutoComplete) {
            return (
                <div className="autocomplete">
                    {this.props.autocomplete}
                </div>
            )
        }
    }

    shouldComponentUpdate(nextState) {
        return nextState !== this.state
    }

    render() {
        return (
            <div className = "searchbox-container">
                <input className = "searchbox" 
                    type = "text" 
                    value = {this.state.userInput} 
                    placeholder = {this.props.placeholder}
                    onChange = {this.handleOnChange}
                    onKeyDown = {this.searchBarOnKeyDown}
                    onClick = {this.onClickHandler}
                    ref={this.textInput}
                    ></input>
                {this.filterOn()}
                {this.showAutoComplete()}
            </div>
        )
    }
}

export default SearchBar
