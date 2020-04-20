import React from 'react'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom"
  

import './GalleryElement.css'

class GalleryElement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            queryString: "/singlepost?title=" + this.props.element.title + "&author=" + this.props.element.author + "&price=" + this.props.element.price + "&src=" + this.props.element.img + "&id=" + this.props.element.id
        }

        this.selectImg = this.selectImg.bind(this) 
    }
    
    selectImg() {
        if(this.props.onClick){
            this.props.onClick(this.props.element.img)
        }
    }

    isPropsOnClick() {
        if (!this.props.onClick) {
            return (
                <Link to={this.state.queryString}> 
                    <div onClick={this.selectImg} className="frame">
                        <img src={this.props.element.img}></img>
                    </div> 
                </Link>
            )
        } else {
            return (
                <div onClick={this.selectImg} className="frame">
                    <img src={this.props.element.img}></img>
                </div> 
            )
        }
    }

    render() {
        return (
            <div className="galleryElement">
                <a><b>{this.props.element.title}</b> by <b>{this.props.element.author}</b></a> 
                {this.isPropsOnClick()}
                <a>Price: <b>{this.props.element.price}</b> $</a> <br />
                <a href={this.props.element.authorsProfile}>Connect with author</a>
            </div>
        )
    }
}

export default GalleryElement
