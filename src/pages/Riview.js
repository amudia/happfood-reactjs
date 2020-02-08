import React from 'react'
import {APP_URL} from '../resources/config'
import {Row, Col,Button, Container, Input} from 'reactstrap'
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'
import { getCart } from '../redux/action/cart'
import { postRiviews } from '../redux/action/Riviews'
import { connect } from 'react-redux'

const token = Cookie.get('token')
let decode = ''
if(token){
  decode = Jwt(token)
}

class Riview extends React.Component {
  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    
    this.state = {
        riview : "",
        rating : "",
        id:decode.id,
        isFetched:false,
        Subtotal:0,
        isLoading:false
      }
}
async componentDidMount(){
  const {id} = this.props.match.params
  this.props.dispatch(getCart(id))
  console.log(id)
}

async onSubmit(id_item){
  // event.preventDefault();
  const {id} = this.props.match.params
  const id_user = await id
  const riview = this.state.riview
  const rating = this.state.rating
  console.log(id_item,rating)
  await this.props.dispatch(postRiviews(id_item,id_user,riview,rating))
  // window.location.reload()
}

  render() {
    return (
<Container>
  <Row >
  
      <Col md={12} >
      <div class="card" >
        <div class="card-body">
        {!this.props.cart.isLoading&&
      this.props.cart.data.map((v, i)=>(
        <Row>         
          <Col md={2} key={v.id_item}>
          <hr/> 
          <img src={APP_URL.concat(`src/assets/${v.image}`)} alt={v.name_item} className="img-thumbnail"  />
          </Col>
          <Col md={4} style={{marginTop:50}}>
          <Input type="select" name="select" value = {this.state.rating} onChange={(e)=>this.setState({rating:e.target.value})}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Input>
          </Col>
          <Col md={4} style={{marginTop:50, alignItems:'center', justifyContent:'center'}}>
          <Input type="textarea" name="text"
        value={this.state.riview} onChange={(e)=>this.setState({riview:e.target.value})} />
          </Col>
          <Col md={2} style={{marginTop:50, alignItems:'center', justifyContent:'center'}}>
          <Button onClick = {()=>this.onSubmit(v.id_item)} value = 'submit' className="btn btn-success" color='success' style={{textAlign:'center', fontSize:'12px', width:'100%'}}>CONFIRM</Button>
          </Col>
        </Row>
       ) )} 
        </div>
      </div>
      </Col>
    </Row>

  
  </Container>
      )
  }
}
const mapStateToProps = state =>{
  return{
      cart: state.cart,
      riview: state.riview,

  }
}

export default connect (mapStateToProps) (Riview)

