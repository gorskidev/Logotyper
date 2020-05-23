import React, {Component, useEffect, useState} from 'react';
import axios from 'axios'

import {
    BrowserRouter as Router,
    useLocation,
    Link
} from "react-router-dom"

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SingleOrderDisplay() {
    const [orderData, setData] = useState(null);
    const [user, setUser] = useState(null);    

    let query = useQuery();
    let id = query.get("id");
    
    const getData = () => {
        fetch(`http://localhost:3001/api/getData/${id}`)
        .then(data => data.json())
        .then(res => {
            const userId = res.data.byUser
            setData(res.data)

            fetch(`http://localhost:3001/api/getuser/${userId}`)
            .then(data => data.json())  
            .then(res => {
                setUser(res.data)
            })
        })
    }

    useEffect(() => {
        getData()   
    }, [])

    return (
        <div>
            {
                orderData != null && user != null ? (
                    <div>
                        <Link to={`/profile?id=${orderData.byUser}`}>{user.name}</Link>
                        
                        {orderData.brandname}
                        {orderData.brandspec}
                        {orderData.description}
                        {orderData.imgs.map(image => {
                            return (
                                <img src={image} key={image} id='pic-preview' />
                            )
                        })}
                    </div>
                ) : false
                }
        </div>
    )  
}



export default SingleOrderDisplay;