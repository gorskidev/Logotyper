import React from 'react'

import './TagSelectPopUp.css'

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
        this.props.setTags(e.target.innerHTML)
    }

    render() {
        return (
            <div>
                <p>Select your brand</p>
                <a onClick={this.chooseBrand}>Motorization</a> | <a onClick={this.chooseBrand}>Jobs</a> | <a onClick={this.chooseBrand}>Properties</a>
                <a onClick={this.onClickHandler}>Close me</a>
            </div>
        )
    }
}

export default PopUp