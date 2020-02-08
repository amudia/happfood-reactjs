import React from 'react';
import {APP_URL} from '../resources/config'
import Axios from 'axios';
import Cookie from 'js-cookie'
import { Button, Container } from 'reactstrap';
import {connect} from 'react-redux'

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state={
      username:"",
      password:"",
      token:""
    }
  }

  login = async () => {
    
    const url = APP_URL.concat(`users/login`)
    await Axios.post(url, {
      username: this.state.username,
      password: this.state.password
    })
    .then((res) => {
      this.setState({
        token: res.data.auth
      })
      if (this.state.token) {
        Cookie.set("token",this.state.token)
        window.location='/'
            }
            if (res.data.success === false) {
                alert('Incorrect Username or Password')
            }
        })
        .catch((err) => {
            console.log(err)
            alert(err)
        })
}

  render(){
    let { username, password } = this.state
      return (
        <Container>
          <br/><br/><br/>
          <div className="container">
	<div className="row text-center mb-4">
		<div className="col-md-12">
		    <h4>HAPPYFOOD</h4>
		</div>
	</div>
	<div className="row text-center">
	    <div className="col-md-6 offset-md-3">
	        <div className="card">
	            <div className="card-body">
	                <div className="login-title">
	                    <h4>Log In</h4>
	                </div>
	                <div className="login-form mt-4">
	                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                              <input  type="text" placeholder="Username" className="form-control" value={username} onChange={(e) => this.setState({ username: e.target.value })}/>
                            </div>
                            <div className="form-group col-md-12">
                              <input type="password"  placeholder="Password" className="form-control" value={password} onChange={(e) => this.setState({ password: e.target.value })}/>
                            </div>
                          </div>
                      
                        
                        <div className="form-row">
                        <Button type="button" className="btn btn-danger btn-block" onClick={() => {this.login(); }}>Login</Button>
                        </div>
                    </form>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
</div>   

          {/* <Form>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>Username</Label>
            <Col sm={10}>
              <Input type="text" value={username} onChange={(e) => this.setState({ username: e.target.value })} placeholder="Username" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="examplePassword" sm={2}>Password</Label>
            <Col sm={10}>
              <Input type="password" value={password} onChange={(e) => this.setState({ password: e.target.value })} placeholder="Password"   />
            </Col>
          </FormGroup>
          
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button  onClick={()=> {this.login();} }>Login</Button>
            </Col>
          </FormGroup>
        </Form> */}
        </Container>
      )
  }
  
}


const mapStateToProps = state => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(Login)
