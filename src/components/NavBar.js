import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button
  } from 'reactstrap';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {APP_URL} from '../resources/config';
import Axios from 'axios';
import Cookie from 'js-cookie';
import Jwt from 'jwt-decode';

const token = Cookie.get('token')

let decode = ''
if(token){
  decode = Jwt(token)
}
  
class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      id : decode.id,
      username: '',
      password: '',
      token: ''
    }
  }

  async componentDidMount(){
    const url = APP_URL.concat(`categories`)
    const user = await Axios.get(url)
    const {data} = user
    console.log(data)
    this.setState(
        { data, isFetchedData:true})
}

  logout = async () => {
    const url = APP_URL.concat(`users/logout`)
    // console.log(token)
    await Axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .then((res) => {
            console.log(token)
            if (res.data.success === true) {
                Cookie.remove('token')
                window.location.reload()
            }
        })
        .catch((err) => {
            console.log(err)
            alert(err)
        })
}

  toggle = ()=>{
    this.setState({isOpen:!this.state.isOpen})
  }
  toggleSidebar = (e)=>{
    e.preventDefault()
    this.props.toggleSidebar()
  }
  render() {
    return (
        <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" style={{fontSize:20}}><i>happ</i><b><i>food</i></b></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link to="/" className="nav-link" style={{color: 'white', textDecoration: 'none'}}><b>Home</b></Link>
              </NavItem>
              <NavItem>
                <Link to="/Restaurants" className="nav-link" style={{color: 'white', textDecoration: 'none'}}>Menu</Link>
              </NavItem>
            </Nav>
            <Nav navbar style={{paddingRight:'150px'}}>
            <NavItem>
            </NavItem>
            {!token?

            <Nav navbar>
            <NavItem>
              <Link className="nav-link btn btn-danger" style={{color:'#dd4045', marginLeft:5, marginTop:15,borderColor:'#dd4045',backgroundColor:'#fff', fontSize:11}} to="/Login"><b>LOGIN</b></Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link btn btn-danger" style={{color:'#dd4045', marginLeft:5, marginTop:15,borderColor:'#dd4045', backgroundColor:'#fff',fontSize:11}} to="/Register"><b>REGISTER</b></Link>
            </NavItem>
            </Nav>
:
            <Nav navbar>
            <NavItem>
            <Button onClick={() => {this.logout(); }} type='submit' value = 'submit' color="danger" style={{color:'#dd4045', marginLeft:5, marginTop:15,borderColor:'#dd4045', backgroundColor:'#fff',fontSize:11}}><b>LOGOUT</b></Button>
            </NavItem>
            <NavItem>
            <Link className="nav-link" style={{ color:'#fff', marginLeft:5, fontSize:30}} to={`/Profile/${this.state.id}`}>
            <i className="fa fa-user-circle mr-1" ></i>
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" style={{ color:'#fff', marginLeft:5, fontSize:30}} to={`/Carts/${this.state.id}`}>
            <i className="fa fa-shopping-cart mr-1" ></i>
            </Link>
          </NavItem>
            </Nav>
  }
          </Nav>
          </Collapse>
        </Navbar>
      </div>

        )
  }
}
export default NavBar