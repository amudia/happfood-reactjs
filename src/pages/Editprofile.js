import React from 'react';
import {APP_URL} from '../resources/config'
import Axios from 'axios';
import { Button, Container, FormGroup, Label, Input, FormText } from 'reactstrap';
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
    // this.onSubmit = this.onSubmit.bind(this);
    this.state={
        id:decode.id,
        id_user: "",
        data : null,
        isFetched:false,
        name:"",
        username:"",
        photo:null
  }
  }

  async componentDidMount(){
      const {id} = this.props.match.params
      const url = APP_URL.concat(`users/${id}`)
      if(id == decode.id){
          const users = await Axios.get(url, {
              headers: {
                Authorization: 'Bearer ' + token
            }
          })
          const {data} = users
          this.setState({
              data,
              id_user:data.data[0].id_user, 
              name:data.data[0].name, 
              username:data.data[0].username, 
              photo:data.data[0].photo, 
              isFetched:!this.state.isFetched})
    
      }
  }

  onSubmit = async (id_user) =>{
    const id = decode.id
    const url = APP_URL.concat(`/edit/customer/${id}`)
    await Axios.put(url, {
        name : this.state.name,
        username : this.state.username,
        photo : this.state.photo,
        id : id_user,
    },
    {headers: {
        Authorization: 'Bearer ' + token}})
        alert('sucess')
        window.location.reload()
  } 

  onFormSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('myImage',this.state.file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    Axios.post("/upload",formData,config)
        .then((response) => {
            alert("The file is successfully uploaded");
        }).catch((error) => {
    });
}
onChange(e) {
    this.setState({file:e.target.files[0]});
}



  render(){
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
                        {isFetched&&
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <img src={`${this.state.photo}`} alt="" className="imgDetailItem" width="100px" height="100px" style={{textAlign:"center"}} />
                            </div>
                            <div className="form-group col-md-12">
                                {/* <Input type="file" name="file" id="exampleFile" /> */}
                                <Input type="file" name="image" id="image" accept="jpg,png,jpeg" onChange={e => this.onSubmit(e.target.files)} multiple />
                        
                            </div>
                            <div className="form-group col-md-12">
                                <h6>Name:</h6>
                            <input  type="text" placeholder="Name" className="form-control" value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})}/>
                            </div>
                            <div className="form-group col-md-12">
                                <h6>Username:</h6>
                            <input  type="text" placeholder="Username" className="form-control" value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})}/>
                            </div>
                        <div className="form-row">
                        <Button type="submit" className="btn btn-danger btn-block" onClick =  {() => this.onSubmit(this.state.id_user)}>SAVE</Button>
                        </div>
                          </div>
                                                 
                            
  }
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
