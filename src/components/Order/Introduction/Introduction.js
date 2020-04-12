import React from 'react'

import './Introduction.css'

class Introduction extends React.Component {
    constructor(props) {
        super(props)
        
        this.nextComponent = this.nextComponent.bind(this)
    }

    nextComponent() {
        this.props.nextComponent()
    }

    render() {
        return (
            <div className="box gray mW-50">
                <h1>Hi!</h1>
                <p>Would you like our assistant to help you create your perfect order?</p>
                <button className="mT-2 mB-1 pg-05 rounded clickable" onClick={this.nextComponent}>Yes!</button>
                <p className="clickable">No thanks, I'll do it myself!</p>
            </div>
        )
    }
}

export default Introduction