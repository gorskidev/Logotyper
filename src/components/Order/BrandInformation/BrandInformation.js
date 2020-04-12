import React from 'react'

import './BrandInformation.css'

import PopUp from '../TagSelectPopUp/TagSelectPopUp'

class BrandInformation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            brandName: this.props.brandName,
            brandSpecialization: this.props.brandSpec,
            showPopUp: false
        }

        this.onInputBrandNameHandler = this.onInputBrandNameHandler.bind(this)
        this.onInputBrandSpecializationHandler = this.onInputBrandSpecializationHandler.bind(this)
        this.onClickHandler = this.onClickHandler.bind(this)
        this.closeWindow = this.closeWindow.bind(this)
    }

    onInputBrandNameHandler = (e) => {
        this.props.onBrandNameChange(e)
        this.setState({
            brandName: e.target.value
        })
    }

    onInputBrandSpecializationHandler = (e) => {
        this.props.onBrandSpecChange(e)
    }

    onClickHandler = (e) => {
        e.preventDefault()
        this.setState({
            showPopUp: true
        })
    }

    closeWindow() {
        this.setState({
            showPopUp: false
        })
    }
    
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.tags != this.props.tags || nextProps.brandName != this.props.brandName || nextProps.brandSpec != this.props.brandSpec || nextState.brandSpecialization != this.state.brandSpecialization || nextState.showPopUp != this.state.showPopUp
    }

    render() {
        return (
            <div className="box gray mW-25">
                <div>
                    <p className="text-center">What's the name of your brand?</p>
                    <input className="center mW-25 mT-1" 
                        onChange = {this.onInputBrandNameHandler} 
                        value = {this.state.brandName} 
                        type = "text"
                    >    
                    </input>
                    <p className="text-center mT-1">What does your brand specialize in?</p>
                    <input className="center mW-25 mT-1"
                        onChange = {this.onInputBrandSpecializationHandler} 
                        onClick = {this.onClickHandler}
                        value = {this.props.brandSpec} 
                        type = "text"
                    >    
                    </input>
                    {this.state.showPopUp ? 
                        <PopUp
                            setTags = {this.props.setTags}
                            click={this.closeWindow}/> 
                        : null
                    }
                </div>
                <div className="mT-2">
                    <p>Tags</p>
                    {this.props.tags}
                </div>
            </div>
        )
    }
}

export default BrandInformation