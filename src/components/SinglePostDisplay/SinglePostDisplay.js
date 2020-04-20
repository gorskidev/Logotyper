import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useLocation
  } from "react-router-dom"

import GalleryElement from '../GalleryElement/GalleryElement'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function getToUpperCase(input) {
    if (typeof input === 'string') {
        return input.charAt(0).toUpperCase() + input.slice(1)
    } else {
        return input
    }
}

function getNameToUpperCase(input) {
    if (typeof input === 'string') {
        return input.split(" ").map(name => (name[0].toUpperCase() + name.slice(1))).join(" ")
    } else {
        return input
    }
}

function SinglePostDisplay () {
    let query = useQuery();
    return (
        <div className="grid mB-3 mT-3 gray pg-3 mW-50 center">
            <div className="">
                <img className="mW-10 center" src={query.get("src")}/>
            </div>
            <div className="">
            <p className="f-size2 bold">{getToUpperCase(query.get("title"))}</p>
            <p>{getNameToUpperCase(query.get("author"))}</p>
            <p className="mT-2">Authors price {query.get("price")} $</p>
            </div>
        </div>
    )
}

export default SinglePostDisplay