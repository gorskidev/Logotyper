import React, { useState, useEffect } from 'react'

// Dependencies
import jwt_decode from 'jwt-decode'
import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom"

  
import { IconContext } from 'react-icons';
import { FcCollaboration, FcBookmark } from "react-icons/fc";

import axios from 'axios'

import GalleryElement from '../GalleryElement/GalleryElement'


// Utils
import {setAuthToken} from '../../util/auth'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function getToUpperCase(input) {
    if (typeof input === 'string') {
        return input.charAt(0).toUpperCase() + input.slice(1)
    }
    return input
}

function getNameToUpperCase(input) {
    if (typeof input === 'string') {
        return input.split(" ").map(name => (name[0].toUpperCase() + name.slice(1))).join(" ")
    }
    return input
}

function SinglePostDisplay () {
    const [data, setData] = useState({})
    const [userBookmarks, setUserBookmarks] = useState({})
    const [bookmark, setBookmark] = useState("clickable")

    let query = useQuery();
    const id = query.get("id")
    const getData = () => {
        if (localStorage.jwtToken) {
            // Set auth token header auth
            const token = localStorage.jwtToken;
            // Decode token and get user info and exp
            const decoded = jwt_decode(token);
            //console.log(decoded)
            // Set user and isAuthenticated
            fetch(`/api/getuser/${decoded.id}`)
            .then(data => data.json())
            .then(res => {
                setUserBookmarks(res.data.bookmarks)
                res.data.bookmarks.some(item => {
                    if (item._id == id) {
                        setBookmark("bookmarked")
                        return
                    }
                })
            })
            .catch(err => console.log("Error " + err))
        }

        fetch(`/upload/getUploads/${id}`)
        .then(data => data.json())
        .then(res => setData(res))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getData()
    }, [])

    const bookmarkHandler = () => {
        let userID;

        if (localStorage.jwtToken) {
            const token = localStorage.jwtToken;
            const decoded = jwt_decode(token)
            userID = decoded.id
        }

        const addToBookmarks = () => {
            axios.post('/api/addtobookmarks', {_id: data._id, imgPath: data.imgPath, userID: userID})
            .then(res => setUserBookmarks(res.data.bookmarks))
        }

        const removeFromBookmarks = () => {
            axios.post(`/api/removebookmark/${id}`, {userID})
            .then(res => setUserBookmarks(res.data.bookmarks))
            .catch(err => console.log(err.response))
        }

        console.log(id)
        if (userBookmarks.some(item => item._id == id)) {
            removeFromBookmarks()
            setBookmark("clickable");
        } else {
            addToBookmarks()
            setBookmark("bookmarked")
        }
    }

    return (
        <div>
            {
                data ? (
                    <div className="grid mB-3 mT-3 gray pg-3 mW-75 center">
                        <div className="">
                            <img className="mW-40 center pg-1" src={data.imgPath}/>
                        </div>
                        <div className="">
                        <p className="f-size2 bold">{getToUpperCase(data.title)}</p>
                        <p><Link to={`profile?id=${data.author_id}`}>{getNameToUpperCase(data.author)}</Link></p>
                        <p className="mT-2">{data.price} $</p>
                        <p onClick={bookmarkHandler} className={bookmark}>Add to bookmarks</p>
                        {
                            localStorage.jwtToken ?  (
                                <IconContext.Provider className="bookmark-icon" value = {{ size: '2rem' }}>
                                    <a onClick={bookmarkHandler} id="addtobookmarks" className={bookmark}><FcBookmark/></a>
                                </IconContext.Provider>
                            ) : null
                        }
                        </div>
                    </div>
                ) : null    
            }
        </div>
    )
}

export default SinglePostDisplay