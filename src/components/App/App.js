import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

// CSS
import './App.css';

// Images
import character from './character.png'
//import box from './box.png'

// Components
import SearchBar from '../SearchBar/SearchBar'
import HomePage from '../HomePage/HomePage'
import Gallery from '../Gallery/Gallery';
import Order from '../Order/Order'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faChevronDown, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faChevronDown, faAngleLeft, faAngleRight)

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span>
        <a href="#" id="addlogo">Add your logo</a>
        <div id="menu">
            {/*<a href="#">Order </a>
            <a href="#">Logo generator </a>*/}
            <Link className="menuA" to="/order">Order</Link>
            <Link className="menuA" to="/gallery">Gallery</Link>
            {/*<a href="#">Sign Up </a>
            <a id="signin" href="#">Sign In </a>*/}
        </div>
      </span>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gallery: [
        {
          title: 'Apple',
          author: 'Rob Janoff'  ,
          profileUrl: 'https://flock.com/',
          price: 255.49,
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png',
          id: 0,
          tags: ['programming', 'web', 'service']
        },
        {
          title: 'Microsoft',
          author: 'Scott Baker',
          profileUrl: 'https://flock.com/',
          price: 239.99,
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Microsoft_logo_-_2012_%28vertical%29.svg/1910px-Microsoft_logo_-_2012_%28vertical%29.svg.png',
          id: 1,
          tags: ['programming']
        },
        {
          title: 'Amazon',
          author: 'Jeff Bezos',
          profileUrl: 'https://flock.com/',
          price: 174.49,
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png',
          id: 2,
          tags: ['shop', 'motor']
        },
        {
          title: 'BMW',
          author: 'Jens Thiemer',
          profileUrl: 'https://flock.com/',
          price: 142,
          img: 'https://seeklogo.net/wp-content/uploads/2020/03/new-bmw-logo-2020.png',
          id: 3,
          tags: ['cars', 'motorization', 'motor']
        },
        {
          title: 'Flock',
          author: 'Peter Komierowski',
          profileUrl: 'https://flock.com/',
          price: 69.49,
          img: 'data:image/png;base64,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',
          id: 4,
          tags: ['work', 'job']
        },
        {
          title: 'Facebook',
          author: 'Mike Buzzard',
          profileUrl: 'https://flock.com/',
          price: 541.49,
          img: 'https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512',
          id: 5,
          tags: ['web service', 'internet']
        },
        {
          title: 'Netflix',
          author: 'Unknown',
          profileUrl: 'https://flock.com/',
          price: 154.49,
          img: 'https://bi.im-g.pl/im/c7/6d/17/z24565703IER,Netflix-logo.jpg',
          id: 6,
          tags: ['web service', 'internet']
        },
        {
          title: 'Twitter',
          author: 'Simon Oxley',
          profileUrl: 'https://flock.com/',
          price: 213.49,
          img: 'data:image/png;base64,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',
          id: 7,
          tags: ['web service', 'internet']
        },
        {
          title: 'HBO GO',
          author: 'Gerard Huerta',
          profileUrl: 'https://flock.com/',
          price: 253.49,
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HBO_logo.svg/1280px-HBO_logo.svg.png',
          id: 8,
          tags: ['movies']
        },
        {
          title: 'Messenger',
          author: 'Mike Oxley',
          profileUrl: 'https://flock.com/',
          price: 253.49,
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Facebook_Messenger_logo.svg/1200px-Facebook_Messenger_logo.svg.png',
          id: 9,
          tags: ['internet', 'messages', 'web service']
        },        
        {
          title: 'Google',
          author: 'Sergey Brin',
          profileUrl: 'https://flock.com/',
          price: 123.49,
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1024px-Google_2015_logo.svg.png',
          id: 10,
          tags: ['internet', 'programming']
        },
        {
          title: 'Audi',
          author: 'August Horch',
          profileUrl: 'https://flock.com/',
          price: 261.29,
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Audi_logo_detail.svg/1280px-Audi_logo_detail.svg.png',
          id: 11,
          tags: ['cars', 'motorization']
        },
        {
          title: 'Żabka',
          author: 'Unknown',
          profileUrl: 'https://flock.com/',
          price: 12.43,
          img: 'https://www.marketplanet.pl/wp-content/uploads/2017/12/Zabka-logo-2016.png',
          id: 12,
          tags: ['shop', 'food']
        },
        {
          title: 'Gucci',
          author: 'Aldo Gucci',
          profileUrl: 'https://flock.com/',
          price: 253.49,
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/1960s_Gucci_Logo.svg/1200px-1960s_Gucci_Logo.svg.png',
          id: 13,
          tags: ['clothes']
        },
        {
          title: 'StackOverflow',
          author: 'Mike Oxley',
          profileUrl: 'https://flock.com/',
          price: 253.49,
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/1280px-Stack_Overflow_logo.svg.png',
          id: 14,
          tags: ['programming', 'developer']
        },
        {
          title: 'Visual Studio Code',
          author: 'Unknown',
          profileUrl: 'https://flock.com/',
          price: 253.49,
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1200px-Visual_Studio_Code_1.35_icon.svg.png',
          id: 15,
          tags: ['programming', 'developer']
        },
      ]
    }
  }

  render() {
    return(
      <div>
        <Router>
          <div>
            <nav>
                <Link id="logo" to="/">LogoTyper</Link>
                <SearchBar placeholder={"Search for logos, authors, users..."} />
                <Navbar />
            </nav>
            </div>
            <Switch>
              <Route path="/gallery">
                <div id="galleryApp">
                  <Gallery elements={this.state.gallery} defaultAmount={16} />
                </div>
              </Route>
              <Route path="/order">
                  <Order />
              </Route>
              <Route path="/">
                <HomePage elements={this.state.gallery}/>
              </Route>
            </Switch>
          <footer>
            <div>
              <h2>LogoTyper</h2>
            </div>
              <Navbar />
              <a>Developed By Maciej Górski</a>
          </footer>
        </Router>
      </div>
    )
  }
}

export default App;
