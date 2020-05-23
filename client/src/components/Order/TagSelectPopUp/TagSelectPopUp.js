import React from 'react'

import './TagSelectPopUp.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IconContext } from "react-icons";
import { FcAutomotive, FcBusinessman, FcHome, FcMusic, FcSportsMode, FcLibrary, FcLike, FcLinux, FcSupport } from 'react-icons/fc';


class PopUp extends React.Component {
    constructor(props) {
        super(props)

        this.onClickHandler = this.onClickHandler.bind(this)
        this.chooseBrand = this.chooseBrand.bind(this)
    }

    onClickHandler = e => {
        this.props.click(e)
    }

    chooseBrand = e => {
        this.props.setTags(e.currentTarget.id)
        this.props.click(e)
    }
    
    componentDidMount() {
        window.addEventListener("keydown", e => {
            if (e.keyCode === 27) {
                this.props.click(e)
            }
        })
    }

    render() {
        return (
            <div className="ts-box">
                <div className="ts-title">
                    <p>Select your category</p>
                </div>
                <IconContext.Provider value = {{ style: {margin: '0 auto', width: '5rem'}, size: '2rem' }}>

                    <div className="optionsGrid">
                        <span onClick={this.chooseBrand} id="motorization" className="blockOpt clickable">
                            <FcAutomotive />
                            Motorization 
                        </span>
                        <span onClick={this.chooseBrand} id="jobs market" className="blockOpt clickable">
                            <FcBusinessman />
                            <p>Jobs market</p>
                        </span>
                        <span onClick={this.chooseBrand} id="properties" className="blockOpt clickable">
                            <FcHome />
                            <p> Properties </p>
                        </span> 
                        <span onClick={this.chooseBrand} id="it industry" className="blockOpt clickable">
                            <FcLinux />
                            <p> IT Industry </p>
                        </span> 
                        <span onClick={this.chooseBrand} id="engineering" className="blockOpt clickable">
                            <FcSupport />
                            <p> Engineering </p>
                        </span>
                        <span onClick={this.chooseBrand} id="sport" className="blockOpt clickable">
                            <FcSportsMode />
                            <p> Sport </p>
                        </span> 
                        <span onClick={this.chooseBrand} id="legal services" className="blockOpt clickable">
                            <FcLibrary />
                            <p> Legal services </p>
                        </span> 
                        <span onClick={this.chooseBrand} id="health" className="blockOpt clickable">
                            <FcLike />
                            <p> Health </p>
                        </span> 
                        <span onClick={this.chooseBrand} id="music" className="blockOpt clickable">
                            <FcMusic />
                            <p> Music </p>
                        </span> 
                    </div>
                </IconContext.Provider>
                <a className="ts-closebutton" onClick={this.onClickHandler}><FontAwesomeIcon icon="times"/></a>
            </div>
        )
    }
}

export default PopUp