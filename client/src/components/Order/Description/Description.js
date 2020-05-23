import React from 'react'

import './Description.css'

class Description extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="box gray rounded box-shadow center mW-25">
                <p className="mB-1">Add description</p>
                <textarea className="pg-05" id="textarea-desc" type="text" rows="10" onChange={this.props.setDescription} value={this.props.description} placeholder="Describe your brand"></textarea>
            </div>
        )
    }
}

export default Description