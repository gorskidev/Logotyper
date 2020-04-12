import React from 'react'

import './SearchBar.css'

class SearchBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userInput: '',
            filterFrom: '',
            filterTo: '',
            undefinedFilterTo: 10000
        }
        
        this.filterOn                   = this.filterOn.bind(this)
        this.filterFromHandleOnChange   = this.filterFromHandleOnChange.bind(this)
        this.filterToHandleOnChange     = this.filterToHandleOnChange.bind(this)
        this.onChange                   = this.handleOnChange.bind(this)
        this.onKeyDown                  = this.onKeyDown.bind(this)
        this.search                     = this.search.bind(this)
    }

    filterOn() {
        if (this.props.showFilter) {
            if (this.props.onFilterFrom && this.props.onFilterTo) {
                return (
                    <span>
                        <input className="filterInput" type="text" value={this.state.filterFrom} onKeyDown={this.onKeyDown} onChange={this.filterFromHandleOnChange} placeholder="Price from" />
                        <input className="filterInput" type="text" value={this.state.filterTo} onKeyDown={this.onKeyDown} onChange={this.filterToHandleOnChange} placeholder="Price to" />
                    </span>
                )
            } else if (this.props.onFilterFrom && !this.props.onFilterTo) {
                return (
                    <span>
                        <input className="filterInput" type="text" value={this.state.filterFrom} onKeyDown={this.onKeyDown} onChange={this.filterFromHandleOnChange} placeholder="Price from" />
                    </span>
                )
            } else if (!this.props.onFilterFrom && this.props.onFilterTo) {
                return (
                    <span>
                        <input className="filterInput" type="text" value={this.state.filterTo} onKeyDown={this.onKeyDown} onChange={this.filterToHandleOnChange} placeholder="Price to" />
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
                this.filterFrom()
                this.props.setFilterFrom(this.state.filterFrom)
            })
        }
    }

    filterToHandleOnChange = e => {
        if(!isNaN(e.target.value)){
            this.props.onRemove()
            this.setState({
                filterTo: e.target.value
            }, () => {
                this.filterTo()
                this.props.setFilterTo(this.state.filterTo)
            })
        }

    }

    handleOnChange = e => {
        this.setState({
            userInput: e.target.value
        }, () => {
            this.search()
        })
    }

    onKeyDown = e => {
        if(e.keyCode === 8){
            this.props.onRemove()
        }
    }

    search() {
        this.props.onSearch(this.state.userInput, this.state.filterFrom, this.state.filterTo)
    }

    filterFrom() {
        this.props.onFilterFrom(this.state.filterTo, this.state.filterFrom)
    }

    filterTo() {
        this.props.onFilterTo(this.state.filterFrom, this.state.filterTo)
    }

    setFilterFrom() {
        this.props.setFilterFrom(this.state.filterFrom)
    }

    setFilterTo() {
        this.props.setFilterTo(this.state.filterTo)
    }

    render() {
        return (
            <div className="searchbox-container">
                <input className="searchbox" 
                    type="text" 
                    value={this.state.userInput} 
                    placeholder={this.props.placeholder}
                    onChange = {this.handleOnChange}
                    onKeyDown = {this.onKeyDown}
                    ></input>
                {this.filterOn()}
            </div>
        )
    }
}

export default SearchBar
