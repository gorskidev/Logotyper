import React from 'react'
import axios from 'axios'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"

import './Order.css'

import Introduction from './Introduction/Introduction'
import BrandInformation from './BrandInformation/BrandInformation'
import Description from './Description/Description'
import Gallery from '../Gallery/Gallery'
import TagSuggests from '../TagSuggests/TagSuggests'
import { toHtml } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class FirstSummary extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="box gray center mW-50">
                <h1>Here is your order so far.</h1>
                <h2>{this.props.brandName}</h2>
                <h2>{this.props.brandSpec}</h2>
                <p>{this.props.tags}</p>
                <div className="grid">
                    {this.props.imgs.map((element, index) => {  
                        return (
                            <div key={index++} className="galleryElement">
                                <div className="frame">
                                    <img src={element} key={index++}></img>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

class Summary extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="box gray center mW-50 mT-2 mB-2">
                <h1>Here is your order.</h1>
                <h2>{this.props.brandName}</h2>
                <h2>{this.props.brandSpec}</h2>
                <p>{this.props.description}</p>
                <p>{this.props.tags}</p>
                <p>{this.props.price} $</p>
                <div className="grid">
                    {this.props.imgs.map((element, index) => {  
                        return (
                            <div key={index++} className="galleryElement">
                                <div className="frame">
                                    <img src={element} key={index++}></img>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

class Order extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            brandName: '',
            brandSpecialization: '',
            tags: '',
            selectedLikeLogos: '',
            description: '',
            price: '',
            currentComponent: 0,
            selectedGallery: [],
            selectedGalleryIds: [],
            galleryLength: 0
        }

        this.nextComponent              = this.nextComponent.bind(this)
        this.previousComponent          = this.previousComponent.bind(this)
        this.onInputBrandNameHandler    = this.onInputBrandNameHandler.bind(this)
        this.onInputBrandSpecHandler    = this.onInputBrandSpecHandler.bind(this)
        this.setTags                    = this.setTags.bind(this)
        this.selectImg                  = this.selectImg.bind(this)
        this.selectImgId                = this.selectImgId.bind(this)
        this.setDescription             = this.setDescription.bind(this)
        this.setPrice                   = this.setPrice.bind(this)
    }
    
    onInputBrandNameHandler = e => {
        this.setState({
            brandName: e.target.value
        })
    }

    onInputBrandSpecHandler = e => {
        this.setState({
            brandSpecialization: e.target.value
        })
    }

    setTags(newTag) {
        if (newTag.toLowerCase().includes('motor') && !this.state.tags.includes('engine')) {
            this.setState({
                tags: Array('motor', 'engine', 'motorization', 'engineer')
            })
        } else if (newTag.toLowerCase().includes('jobs') && !this.state.tags.includes('jobs')) {
            this.setState({
                tags: Array('house', 'develop')
            })
        } else if (newTag.toLowerCase().includes('properties')) {
            this.setState({
                tags: Array('workers', 'job', 'future')
            })
        }
        newTag = newTag.charAt(0).toUpperCase() + newTag.slice(1, newTag.length)
        this.setState({
            brandSpecialization: newTag
        })
    }

    selectImg(e) {
        if (!this.state.selectedGallery.includes(e) && this.state.selectedGallery.length <= 5) {
            this.setState({
                selectedGallery: this.state.selectedGallery.concat(e)
            }, this.setState({
                galleryLength: this.state.galleryLength + 1
            }))
        } else if (this.state.selectedGallery.includes(e)) {
            const index = this.state.selectedGallery.indexOf(e)
            const array = [...this.state.selectedGallery]
            if (index !== -1) {
                array.splice(index, 1)
                this.setState({
                    selectedGallery: array,
                }, this.setState({
                    galleryLength: this.state.galleryLength - 1
                }))
            }
        }

        return this.state.galleryLength
    }
    
    selectImgId(e) {
        if (e !== 'noreturn' && !this.state.selectedGalleryIds.includes(e) && this.state.selectedGalleryIds.length <= 5) {
            this.setState({
                selectedGalleryIds: this.state.selectedGalleryIds.concat(e)
            })
        } else if (this.state.selectedGalleryIds.includes(e)) {
            const index = this.state.selectedGalleryIds.indexOf(e)
            const array = [...this.state.selectedGalleryIds]
            if (index !== -1) {
                array.splice(index, 1)
                this.setState({
                    selectedGalleryIds: array,
                })
            }
        }

        return this.state.selectedGalleryIds
    }

    setDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
        
    setPrice(e) {
        if (!isNaN(e.target.value)) {
            this.setState({
                price: e.target.value
            })
        }
    }

    setComponent() {
        switch (this.state.currentComponent) {
            case 0:
                return (
                    <Introduction 
                        nextComponent = {this.nextComponent}
                    />
                    )
                    break;  
            case 1:
                return (
                    <div>
                        <BrandInformation 
                            brandName = {this.state.brandName}
                            brandSpec = {this.state.brandSpecialization}
                            onBrandNameChange = {this.onInputBrandNameHandler}
                            onBrandSpecChange = {this.onInputBrandSpecHandler}
                            tags = {this.state.tags}
                            setTags = {this.setTags}
                        /> 
                        {/*<TagSuggests 
                            brandSpec = {this.state.brandSpecialization} 
                            tags = {this.state.tags}
                            setTags = {this.setTags}
                        />*/}
                        <div className="pn-buttons-container">
                            <button className="centeredButton" onClick = {this.previousComponent}><FontAwesomeIcon icon="angle-left"/></button>
                            <button className="centeredButton" onClick = {this.nextComponent}><FontAwesomeIcon icon="angle-right"/></button>
                        </div>
                    </div>
                    )   
                    break;
            case 2: 
                return (
                    <div className="center mW-75">
                        <a className="center box mW-30 text-center f-size2"> Pick logos that you like! </a>
                        <Gallery 
                            elements = {this.state.gallery} 
                            defaultAmount = {8}
                            showFilter = {false}
                            showSearchBar = {false}
                            selectImg = {this.selectImg}
                            selectImgId = {this.selectImgId}
                            ImgActive = {true}
                            showElement = {false}
                            hideInfo = {true}
                        />
                        <div className="pn-buttons-container">
                            <button className="centeredButton" onClick = {this.previousComponent}><FontAwesomeIcon icon="angle-left"/></button>
                            <button className="centeredButton" onClick = {this.nextComponent}><FontAwesomeIcon icon="angle-right"/></button>
                        </div>
                    </div>
                )
                break;
            case 3:
                return (
                    <div className="box gray rounded-box mW-50 box-shadow">
                        <FirstSummary 
                            brandName = {this.state.brandName}
                            brandSpec = {this.state.brandSpecialization}
                            tags = {this.state.tags}
                            imgs = {this.state.selectedGallery}
                        />
                        <div className="pn-buttons-container">
                            <button className="centeredButton" onClick = {this.previousComponent}><FontAwesomeIcon icon="angle-left"/></button>
                            <button className="centeredButton" onClick = {this.nextComponent}><FontAwesomeIcon icon="angle-right"/></button>
                        </div>
                    </div>
                )
                break;
            case 4: 
                return (
                    <div>
                        <Description 
                            setDescription = {this.setDescription}
                            description = {this.state.description}
                        />
                        <div className="pn-buttons-container">
                            <button className="centeredButton" onClick = {this.previousComponent}><FontAwesomeIcon icon="angle-left"/></button>
                            <button className="centeredButton" onClick = {this.nextComponent}><FontAwesomeIcon icon="angle-right"/></button>
                        </div>
                    </div>
                )
                break;
            case 5:
                return (
                    <div>
                        <div className="box gray center mW-25 rounded box-shadow mT-2 mB-3">
                            <p>How much would you pay for your logo?</p>
                            <input className="center text-center mW-5 mT-2 rounded pg-05" onChange={this.setPrice} type="text" value={this.state.price}></input>
                        </div>
                        <div className="pn-buttons-container">
                            <button className="centeredButton" onClick = {this.previousComponent}><FontAwesomeIcon icon="angle-left"/></button>
                            <button className="centeredButton" onClick = {this.nextComponent}><FontAwesomeIcon icon="angle-right"/></button>
                        </div>
                    </div>
                )
            case 6: 
                return (
                    <div>
                        <Summary
                            brandName = {this.state.brandName}
                            brandSpec = {this.state.brandSpecialization}
                            tags = {this.state.tags}
                            imgs = {this.state.selectedGallery}
                            description = {this.state.description}
                            price = {this.state.price}
                        />
                        <div className="pn-buttons-container">
                            <button className="centeredButton" onClick = {this.previousComponent}><FontAwesomeIcon icon="angle-left"/></button>
                            <button className="centeredButton" onClick = {this.nextComponent}><FontAwesomeIcon icon="angle-right"/></button>
                        </div>    
                    </div>
                )
            default:
                break;
        }
    }

    nextComponent() {
        const { currentComponent, brandName, brandSpecialization, selectedGallery, description, price } = this.state
        if (currentComponent < 6) {
            if(currentComponent == 0){
                this.setState({
                    currentComponent: currentComponent + 1
                })
            } else if (currentComponent == 1 && brandName && brandSpecialization) {
                this.setState({
                    currentComponent: currentComponent + 1
                })
                this.getDataFromDb()
            } else if (currentComponent == 2 && selectedGallery.length > 0) {
                this.setState({
                    currentComponent: currentComponent + 1
                }) 
            } else if (currentComponent == 3) {
                this.setState({
                    currentComponent: currentComponent + 1
                }) 
            } else if (currentComponent == 4 && description) {
                this.setState({
                    currentComponent: currentComponent + 1
                }) 
            } else if (currentComponent == 5 && price) {
                this.setState({
                    currentComponent: currentComponent + 1
                }) 
                this.putOrderToDB(this.state.brandName, this.state.brandSpecialization, this.state.description, this.state.price, this.state.selectedGallery)
            }
        }
    }

    previousComponent() {
        const { currentComponent } = this.state
        if (currentComponent > 0) {
            this.setState({
                currentComponent: currentComponent - 1
            })
        }
    }

    getDataFromDb = () => {
        fetch('http://localhost:3001/api/getData')
          .then((data) => data.json())
          .then((res) => this.setState({ datalen: res.data.length }));
    };

    putOrderToDB = (brandname, brandspec, description, price, imgsArr) => {
        axios.post('http://localhost:3001/api/putOrder', {
            id: this.state.datalen + 1,
            brandname: brandname || 'Undefined',
            brandspec: brandspec || 'Undefined',
            description: description || 'Undefined',
            price: price || 'Undefined',
            imgs: imgsArr || 'Undefined',
            byUser: this.props.isAuthorized.id
        });
    };
    
    componentDidMount() {
        fetch('http://localhost:3001/upload/getUploads')
        .then(data => data.json())
        .then(res => {
          this.setState({
            gallery: res.users
          })
        })
        
        this.setState({});
      }

    render() {
        return (
            <div style={{height: '150vh'}}>
                {
                    this.setComponent()
                }
            </div>
        )
    }
}

export default Order
