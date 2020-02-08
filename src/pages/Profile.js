import React from 'react';
import {APP_URL} from '../resources/config'
import Axios from 'axios';
import {  Container} from 'reactstrap';
import {Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'

const token = Cookie.get('token')
let decode = ''
if(token){
    decode = Jwt(token)
}

class Profile extends React.Component{
  constructor(props){
    super(props)
    this.state={
        id:decode.id,
        isFetched:false,
  }
  }

  async componentDidMount(){
      const {id} = this.props.match.params
      const url = APP_URL.concat(`users/${id}`)
      // eslint-disable-next-line eqeqeq
      if(id == decode.id){
          const users = await Axios.get(url, {
              headers: {
                Authorization: 'Bearer ' + token
            }
          })
          const {data} = users
          this.setState({data, isFetched:!this.state.isFetched})
    
      }
  }

  render(){
    // eslint-disable-next-line no-unused-vars
    const id = decode.id
    const {isFetched, data}=this.state
      return (
        <Container>
          <br/><br/><br/>
          <div className="container">
	<div className="row text-center mb-4">
		<div className="col-md-12">
        <h4>Profile</h4>

		</div>
	</div>
	<div className="row text-center">
	    <div className="col-md-6 offset-md-3">
	        <div className="card">
	            <div className="card-body">
	                <div className="login-title">
	                </div>
	                <div className="login-form mt-4">
	                    <form>
                        {isFetched&&data.data.map(v=>{
                                console.log(v)
                            return(
                        <div key={v.id_user} className="form-row">
                            <div className="form-group col-md-12">
                                <img src={`${v.photo}`} alt="" className="imgDetailItem" width="100px" height="100px" style={{textAlign:"center"}} />
                            </div>
                            <div className="form-group col-md-12">
                                <h6>Name :  {v.name}</h6>
                            </div>
                            <div className="form-group col-md-12">
                                <h6>Username : {v.username}</h6>
                            </div>
                          </div>
                                                 
                            )
  })}
                        <div className="form-row">
                        <Link type="submit" className="btn btn-danger btn-block" to={`/Editprofile/${this.state.id}`}>EDIT PROFILE</Link>
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



export default Profile
