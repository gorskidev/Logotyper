import React, { Component } from 'react';
import axios from 'axios';

import './LogoUpload.css';

import TagSuggestion from '../Order/TagSelectPopUp/TagSelectPopUp'

export default class FilesUploadComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: null,
            imgPath: null,
            title: "",
            brandSpecialization: null,
            price: "",
            tags: []
        }

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.setTags = this.setTags.bind(this);
        this.tabClickHandler = this.tabClickHandler.bind(this)
    }

    onFileChange(e) {
        let response = e.target.files[0];    
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            this.setState({ 
                imgSrc: reader.result,
                imgPath: response 
            })
        }, false)
        
        reader.readAsDataURL(response);
    }

    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('imgPath', this.state.imgPath);
        formData.append('title', this.state.title);
        formData.append('brandSpecialization', this.state.brandSpecialization);
        formData.append('price', this.state.price);
        formData.append('tags', this.state.tags);
        formData.append('author', this.props.isAuthorized.name);
        formData.append('author_id', this.props.isAuthorized.id);
        axios.post("http://localhost:3000/upload/image", formData, {
        }).then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }

    closeWindow = (e) => {
        this.setState({
            showPopUp: false
        })

        if (e.keyCode === 27) {
            this.setState({
                showPopUp: false
            })
        }
    }

    onClickHandler = (e) => {
        e.preventDefault()
        this.setState({
            showPopUp: true
        })
    }

    setTags(newTag) {
        if (newTag.toLowerCase().includes('motor')) {
            this.setState({
                tags: ['motor', 'engine', 'motorization', 'engineer']
            })
        } else if (newTag.toLowerCase().includes('jobs')) {
            this.setState({
                tags: ['house', 'develop']
            })
        } else if (newTag.toLowerCase().includes('properties')) {
            this.setState({
                tags: ['workers', 'job', 'future']
            })
        }
        newTag = newTag.charAt(0).toUpperCase() + newTag.slice(1, newTag.length)
        this.setState({
            brandSpecialization: newTag
        })
    }

    tabClickHandler(e) {
        if (e.keyCode === 9 && document.querySelector("#brandname").value.length > 0) {
            this.setState({
                showPopUp: true
            })
            return (
                <div>
                    {this.state.showPopUp ? 
                        <TagSuggestion
                            setTags = {this.setTags}
                            click={this.closeWindow}/> 
                        : null
                    }
                </div>
            )
        } else if (e.keyCode === 9) {
            e.preventDefault()
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this.tabClickHandler)
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.tabClickHandler)
    }

    render() {
        return (
            <div className="container fullpage">
                <div className="row mW-25 center mT-5">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <p className="text-center">What's your artwork called?</p>
                            <input type="text" 
                                id="brandname" 
                                onChange={(e) => {this.setState({title: e.target.value})}} 
                                value={this.state.title} 
                                className="text-center mW-10 center mT-1"
                            />
                            <p className="text-center mT-1">Pick category.</p>
                            <input type="text" 
                                defaultValue={this.state.brandSpecialization} 
                                onClick={this.onClickHandler} 
                                onKeyDown={(e) => e.preventDefault()} 
                                className="text-center mW-10 center mT-1"    
                            />
                            {this.state.showPopUp ? 
                                <TagSuggestion
                                    setTags = {this.setTags}
                                    click = {this.closeWindow} /> 
                                : null
                            }
                            <p className="text-center mT-1">What's your artwork's price?</p>
                            <input type="text" onChange={(e)=>{if(!isNaN(e.target.value)){this.setState({price: e.target.value})}}}
                                onKeyDown = {(e)=>{if(e.keyCode === 32){e.preventDefault()}}}
                                value={this.state.price}
                                className="mW-5 center text-center mT-1"
                                />
                            <input type="file" 
                                onChange={this.onFileChange}
                                className="center mW-10 mT-2" />
                        </div>
                        <div className="form-group center mW-10">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                        <img src={this.state.imgSrc} id="pic-preview"/>
                    </form>
                </div>
            </div>
        )
    }
}