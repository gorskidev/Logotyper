import React from 'react'

import './AutoComplete.css'


import {
  BrowserRouter as Router,
  Link
} from "react-router-dom"


class AutoComplete extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      suggestion: [],
      //queryString: "/singlepost?title=" + this.props.element.title + "&author=" + this.props.element.author + "&price=" + this.props.element.price + "&src=" + this.props.element.img + "&id=" + this.props.element.id
    }

    this.handleClick = this.handleClick.bind(this)
  }

  pickSuggestion() {
    const { search } = this.props
    this.setState({
      suggestion: this.props.elements.map(element => element).filter(element => 
          element.title.toLowerCase().includes(search.toLowerCase())
          || element.author.toLowerCase().includes(search.toLowerCase())
          || element.tags.join('').includes(search.toLowerCase()) 
          )
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      this.pickSuggestion()
      return true
    }  else if (nextState !== this.state) {
      return true
    } else {
      return false
    }
  }

  handleClick(e){
    this.setState({
      elementTitle: e.target.innerText.split(" ")[0]
    })
    this.props.onClick(e.target.innerText.split(" ")[0])
  }

  parseToGalleryUrl(title, author, price, img, id) {
    return `/singlepost?title=${title}&author=${author}&price=${price}&src=${img}&id=${id}`
  }

  render() {
    return (
      <div className={this.props.cssfixclass + " " + "suggestion-container"}>
        {
          this.state.suggestion.map((element, index) => 
            { 
              if(index < 6) {
                return (
                //<Link to={"/singlepost?title=" + element.title + "&author=" + element.author + "&price=" + element.price + "&src=" + element.img + "&id=" + element.id}>
                <Link to={this.parseToGalleryUrl(element.title, element.author, element.price, element.img, element.id)}>
                  <div className="suggestion" key={index} onClick={this.handleClick}>
                    <span><img src={element.img}/></span> {element.title} by {element.author}
                  </div>
                </Link>
                )
              }
            })
        }
      </div>
    )
  }
}

export default AutoComplete