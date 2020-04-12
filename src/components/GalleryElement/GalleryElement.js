import React from 'react'

import './GalleryElement.css'

class GalleryElement extends React.Component {
    constructor(props) {
        super(props)
        this.selectImg = this.selectImg.bind(this)
    }
    selectImg() {
        this.props.onClick(this.props.element.img)
    }
    render() {
        return (
            <div className="galleryElement">
                <a><b>{this.props.element.title}</b> by <b>{this.props.element.author}</b></a>
                <div onClick={this.selectImg} className="frame">
                    <img src={this.props.element.img}></img>
                </div>
                <a>Price: <b>{this.props.element.price}</b> $</a> <br />
                <a href={this.props.element.authorsProfile}>Connect with author</a>
            </div>
        )
    }
}

export default GalleryElement
