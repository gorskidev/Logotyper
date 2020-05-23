import React from 'react'

import './HomePage.css'

import character from '../App/character.png'
//import box from './box.png'


import Header from '../Header/Header'
import Gallery from '../Gallery/Gallery'

class HomePage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { elements } = this.props
        return (
            <div>
                <Header />
                <div id="Home-Gallery-Container">
                    {/*<AutoComplete suggestions={["1", "10", "100", "150", "175", "2", "20", "200", "3", "300", "300", "4", "40", "400", "5", "50", "500"]} />*/}
                    <Gallery elements={elements} defaultAmount={8} showElement={true}/>
                </div>
                <div id="addyourlogo">
                    <h1 className="headline">Designers, <b>unite</b>.</h1>
                    <p className="description thin">World without you wouldn't be so magnificent. <br />
                        We are here to help designers from all around the globe, to
                        get a chance of becoming even more invaluable.</p>
                    <p className="final">Are you ready to share your work and make money?</p>
                    <div className="upload">
                    <h2>Start now</h2>
                    </div>
                    <img id="character" src={character} />
                </div>
            </div>
        )
    }
}

export default HomePage;
