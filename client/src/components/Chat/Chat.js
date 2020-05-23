import React, {Component, useState, useEffect} from 'react'

import './Chat.css'

import axios from 'axios';
import jwt_decode from 'jwt-decode';

function Chat() {
    const [rawData, setRawData] = useState();
    const [chats, setChats] = useState(); 
    const [actChat, setActChat] = useState();
    const [message, setMessage] = useState('');

    let userId
    if (localStorage.jwtToken) {
        const token = localStorage.jwtToken
        userId = jwt_decode(token).id;
    }

    const getData = () => {
        if (localStorage.jwtToken) {
            const token = localStorage.jwtToken
            const userId = jwt_decode(token).id;
            let chatparties

            fetch(`/api/getuser/${userId}`)
            .then(data => data.json())
            .then(res => {
                const promisesArray = [];
                chatparties = res.data.chatparties
                chatparties.map(item => {
                    promisesArray.push(fetch(`/chat/party/${item}`)
                    .then(data => data.json())
                    )})
                Promise.allSettled(promisesArray)
                .then(res => {
                    const resultsArray = [];
                    res.map(item => resultsArray.push(item.value.result))
                    chatparties = resultsArray
                    // setChats(resultsArray)      
                    const promisesArray = [];
                    resultsArray.map(item => {promisesArray.push(fetch(`/api/getuser/${item.members.find(item => item != userId)}`)
                    .then(data => data.json())
                    )}) 

                    Promise.allSettled(promisesArray)
                    .then(res => {
                        let resultsArray = [];
                        resultsArray = res.map(item => item.value.data);
                        chatparties.map((item, index) => item.members = resultsArray[index].name)
                        chatparties.sort((a,b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
                        setChats(chatparties)
                        setActiveChat(chatparties[0]._id)
                        /*res.map(item => resultsArray.push({_id: item.value.data._id, _name: item.value.data.name}))
                        chatparties.map(item => item.members = resultsArray)
                        setChats(chatparties)*/
                    })
                })
            })
        }
    }

    function refreshData() {
        if (localStorage.jwtToken) {
            const token = localStorage.jwtToken
            const userId = jwt_decode(token).id;
            let chatparties

            fetch(`/api/getuser/${userId}`)
            .then(data => data.json())
            .then(res => {
                const promisesArray = [];
                chatparties = res.data.chatparties
                chatparties.map(item => {
                    promisesArray.push(fetch(`/chat/party/${item}`)
                    .then(data => data.json())
                )})
                Promise.allSettled(promisesArray)
                .then(res => {
                    const resultsArray = [];
                    res.map(item => resultsArray.push(item.value.result))
                    chatparties = resultsArray
                    // setChats(resultsArray)      
                    const promisesArray = [];
                    resultsArray.map(item => {promisesArray.push(fetch(`/api/getuser/${item.members.find(item => item != userId)}`)
                    .then(data => data.json())
                    )}) 

                    Promise.allSettled(promisesArray)
                    .then(res => {
                        let resultsArray = [];
                        resultsArray = res.map(item => item.value.data);
                        chatparties.map((item, index) => item.members = resultsArray[index].name)
                        chatparties.sort((a,b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
                        setChats(chatparties)
                    })
                })
            })
        }
    }

    useEffect(() => {
        getData()
    }, [])

    /*setTimeout(() => {
        setInterval(refreshData(), 1500)
    }, 3000)*/

    function setActiveChat(e) {
        let id 
        e.target ? id = e.target.id : id = e 

        fetch(`/chat/party/${id}`)
        .then(data => data.json())
        .then(res => { 
            setActChat(res)
        })
    }

    function doNothing() {
        return true
    }

    function sendMessage() {
        const messageData = {
            _id: userId,
            messageContent: message
        }

        axios.post(`/chat/send/${actChat.result._id}`, messageData)
    }

    function onSubmitHandler(e) {
        e.preventDefault()
        if (message.length > 0) {
            console.log(message)
            sendMessage()
        }
    }

    function renderActiveChat() {
        return (
            <div id="chatpage"> 
                {
                    actChat.result.messages.map(item => {
                        let defaultClassName = "recipient"

                        if (item._senderId == userId) {
                            defaultClassName = "sender" 
                        }

                        return (
                            <div>
                                <p className={'message ' + defaultClassName}>{item.message}</p>
                                <p className="mB-2"><br></br></p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    function renderChat() {
        setTimeout(() => {
            document.getElementById('chat-box').scroll(0, 500)
        }, 250)
        return (
            <div className="grid">
                <div>
                    {   
                        chats.map(item => { 
                            return (
                                <div onClick={setActiveChat} id={item._id} className="chat-box-message" key={item._id}>
                                    <div className="chat-box-message-notclickable">
                                        <a>{item.members}</a>
                                        <br></br>
                                        <a>{item.messages[0] ? item.messages[item.messages.length-1].message : null}</a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="chat-container">
                    <div id='chat-box' className="chat-box">
                        {   
                            renderActiveChat()
                        }
                    </div>
                    <form id="chatform" onSubmit={onSubmitHandler}>
                        <textarea maxLength="250" rows="2" onChange={(e) => {setMessage(e.target.value)}} value={message}></textarea>
                    <button id="form-button">Wyślij</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="mW-75 center">
            <h1>Chat</h1>
            {
                chats && actChat ? renderChat() : <a>Loading</a>
            }
        </div>
    )
}

export default Chat