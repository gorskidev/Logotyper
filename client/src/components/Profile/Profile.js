import React, {Component, useEffect, useState} from 'react'

import {
    BrowserRouter as Router,
    useLocation
} from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Profile() {
    const [userData, setData] = useState(null);

    let query = useQuery();
    let id = query.get("id");

    const getData = () => {
        fetch(`http://localhost:3001/api/getuser/${id}`)
        .then(data => data.json())
        .then(res => {
            setData(res.data)
        })
    }

    useEffect(() => {
        getData();
    }, [])

    return(
        <div>
            Uploads: 
            {
                (userData !== null && userData !== undefined) ?
                userData.uploads.map(uploads => {
                    return <img id="pic-preview" src={uploads.imgPath}></img>
                }) : <p>Profile doesn't exist.</p>
            }
        </div>
    )

}

export default Profile;