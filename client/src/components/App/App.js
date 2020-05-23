import React from 'react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

// CSS
import './App.css';

// Images
import character from './character.png'
//import box from './box.png'

// Components
import Navbar from '../Navbar/Navbar';
import HomePage from '../HomePage/HomePage';
import SearchBar from '../SearchBar/SearchBar';
import Gallery from '../Gallery/Gallery';
import Order from '../Order/Order';
import SinglePostDisplay from '../SinglePostDisplay/SinglePostDisplay';
import AutoComplete from '../AutoComplete/AutoComplete';
import Orders from '../Orders/Orders';
import LogoUpload from '../LogoUpload/LogoUpload';
import SingleOrderDisplay from '../SingleOrderDisplay/SingleOrderDisplay';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import Chat from '../Chat/Chat'

// Utils
import {setAuthToken} from '../../util/auth'

// Dependencies 
import jwt_decode from 'jwt-decode'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faChevronDown, faAngleLeft, faAngleRight, faTimes, faCarSide, faCheck} from '@fortawesome/free-solid-svg-icons'
import Unauthorized from '../Unauthorized/Unauthorized';

library.add(fab, faChevronDown, faAngleLeft, faAngleRight, faTimes, faCarSide, faCheck)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
    }
  }

  componentDidMount() {
    //console.log(localStorage)
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      //console.log(decoded)
      // Set user and isAuthenticated
      this.setState({
        currentUser: decoded
      })
      //setCurrentUser(decoded);
    // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        localStorage.removeItem("jwtToken");
        setAuthToken(false);
      }
    }
  }

  render() {
    return(
      <div>
        <Router>
            <Navbar isAuthorized={this.state.currentUser || false} elements = {this.state.gallery}/>
          <Switch>
            <Route path="/addyourlogo">
              {
                this.state.currentUser ? 
                <LogoUpload isAuthorized={this.state.currentUser}/> 
                : <Unauthorized/>
              }
            </Route>
            <Route path="/order">
              {
                this.state.currentUser ? 
                <Order isAuthorized={this.state.currentUser}/> 
                : <Unauthorized/>
              }
            </Route>
            <Route path="/orders">
              <Orders />
            </Route>
            <Route path="/singleorder">
              <SingleOrderDisplay />
            </Route>
            <Route path="/gallery">
              <div id="galleryApp">
                <Gallery elements={this.state.gallery} defaultAmount={16} />
              </div>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/singlepost">
              <SinglePostDisplay isAuthorized={this.state.currentUser || false} />
            </Route>
            <Route path="/dashboard">
              {
                this.state.currentUser ? 
                <Dashboard isAuthorized={this.state.currentUser || false} /> 
                : <Unauthorized />
              }
            </Route>
            <Route path="/chat">
              {
                this.state.currentUser ?
                <Chat isAuthorized={this.state.currentUser || false} />
                : <Unauthorized />
              }
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <HomePage isAuthorized={this.state.currentUser} elements={this.state.gallery}/>
            </Route>
          </Switch>
          <footer>
          <div>
            <h2>LogoTyper</h2>
          </div>
            <a>Developed By Maciej Górski</a>
          </footer>
        </Router>
      </div>
    )
  }
}

export default App;
