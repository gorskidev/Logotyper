import React from 'react';

import OrderElement from '../OrderElement/OrderElement';

import {
    BrowserRouter as Router,
    Link
} from "react-router-dom"

class Orders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            isLoading: true
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/getData')  
        .then(data => data.json())
        .then(res => { 
            this.setState({
                orders: res.data,
                isLoading: false
            })
        })
    }

    returnOrders() {
        if (!this.state.isLoading) {
            return (
                this.state.orders.map(data => { 
                    return (
                        <OrderElement order={data} key={data._id} />
                    )   
                })
            )
        } else {
            return (
                <div>
                    <a>Loading...</a>
                </div>
            )
        } 
    }

    shouldComponentUpdate(nextState) {
        if (this.state.orders !== nextState.orders) {
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <div className="mW-50 center mT-2 mB-2">
                <div>
                    <a className="inline-block width-10">Company's name</a> 
                    <a className="inline-block width-10">Targeted price</a> 
                    <a className="inline-block width-10">Selected Images</a>
                </div>
                <ul>
                    {
                        this.returnOrders()
                    }
                </ul>
            </div>
        )
    }
}

export default Orders