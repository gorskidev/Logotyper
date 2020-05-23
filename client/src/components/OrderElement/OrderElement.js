import React, { Component } from 'react'

import {
    BrowserRouter as Router,
    Link
} from "react-router-dom"

import SingleOrderDisplay from '../SingleOrderDisplay/SingleOrderDisplay';

class OrderElement extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const {order} = this.props; 
        return (
            <Link to={{
                pathname: "/singleorder",
                search: "?brandname=" + this.props.order.brandname + "&brandspec=" + this.props.order.brandspec + "&price=" + this.props.order.price + "&id=" + this.props.order._id, 
                state: { order: this.props.order }
            }}>
                <div style={{position: 'relative', marginTop: '1rem', padding: '1rem 1rem'}} className="gray height-5 pT-1">
                    <a style={
                        {position: 'absolute', display: 'block', marginTop: '1rem', width: '8rem', lineHeight: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}
                        } className="inline-block"><b>{order.brandname}</b></a>
                    <a style={{position: 'absolute', display: 'block', marginTop: '1rem', left: '10rem', width: '10rem', lineHeight: '1rem'}} className="inline-block width-10">{order.price} $</a>
                    <span style={{position: 'absolute', left:'19.5rem'}} className="inline-block">
                        {order.imgs.map(img => <img style={{maxHeight: '3rem'}} className="inline-block sM-05" src={img}></img>)}
                    </span>
                </div>
            </Link>
        )
    }
}

export default OrderElement;