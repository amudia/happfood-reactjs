import React from 'react';
import {APP_URL} from '../resources/config'
import Axios from 'axios';
import { Button, Container } from 'reactstrap';
import {registerUser} from '../redux/action/register'
import {connect} from 'react-redux'


class Register extends React.Component{
  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.state={
          name : "",
          username : "",
          password : "",
  }
  }

  async onSubmit (event){
    event.preventDefault();
    const name = await this.state.name
    const username = await this.state.username
    const password = await this.state.password
    await this.props.dispatch(registerUser({name, username, password}))
    alert('Account Success Created!')
    // console.log(this.state)
    // const data = await Axios.post(APP_URL.concat('user/registuser'),this.state)
    console.log(registerUser)
    window.location = '/Login'
      }
  render(){
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
	                    <h4>Register</h4>
	                </div>
	                <div className="login-form mt-4">
	                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                              <input  type="text" placeholder="Name" className="form-control" value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})}/>
                            </div>
                            <div className="form-group col-md-12">
                              <input  type="text" placeholder="Username" className="form-control" value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})}/>
                            </div>
                            <div className="form-group col-md-12">
                              <input type="password"  placeholder="Password" className="form-control" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}/>
                            </div>
                          </div>
                         <div className="form-row">
                        <div className="form-group">
                                <div className="form-check">
                                  <input className="form-check-input" type="checkbox" value="" id="updatecheck1"/>
                                  <label className="form-check-label" for="updatecheck1">
                                    <small>By submitting this form you agree to our <a href="#">terms and conditions </a> </small>
                                    
                                  </label>
                                </div>
                              </div>
                    </div>                        
                        <div className="form-row">
                        <Button type="submit" className="btn btn-danger btn-block" onClick={this.onSubmit}>Register</Button>
                        </div>
                    </form>
	                </div>
	              
	            </div>
	        </div>
	    </div>
	</div>
</div>   

        </Container>
      )
  }
  
}


const mapStateToProps = state => {
  return {
    register: state.register
  }
}

export default connect(mapStateToProps)(Register)
