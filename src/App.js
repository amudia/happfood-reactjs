import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import DetailItem from './pages/DetailItem'
import Register from './pages/Register'
import Carts from './pages/Carts'
import Checkout from './pages/Checkout'
import Riview from './pages/Riview'
import Menu from './pages/Menu'
import Detailrestaurant from './pages/Detailrestaurant'
import Restaurants from './pages/Restaurants'
import Profile from './pages/Profile'
import Editprofile from './pages/Editprofile'



export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      sidebarShow:false
    }
  }
  render() {
    return (
      <Router>
        <div className="fixed-top">
        <NavBar
          toggleSidebar={
            ()=>this.setState({sidebarShow:!this.state.sidebarShow})
          }/>
          </div>
          <br/><br/><br/><br/>
        <Switch>
          <Route path='/' exact>
            <Home/>
          </Route>
          <Route path='/Login' exact>
            <Login/>
          </Route>
          <Route path='/Register' exact>
            <Register/>
          </Route>
          <Route path='/DetailItem' exact>
            <DetailItem/>
          </Route>
          <Route path='/Restaurants' exact>
            <Restaurants/>
          </Route>
          <Route path='/Riview' exact>
            <Riview/>
          </Route>

          <Route path='/detailitem/:id' exact component={DetailItem}/>
          <Route path='/detailrestaurant/:id' exact component={Detailrestaurant}/>
          <Route path='/restaurants/menu/:id' exact component={Menu}/>
          <Route path='/Carts/:id' exact component={Carts}/>
          <Route path='/Checkout/:id' exact component={Checkout}/>
          <Route path='/Profile/:id' exact component={Profile}/>
          <Route path='/Riview/:id' exact component={Riview}/>
          <Route path='/Editprofile/:id' exact component={Editprofile}/>
        </Switch>
        <Footer/>
      </Router>
    )
  }
}
