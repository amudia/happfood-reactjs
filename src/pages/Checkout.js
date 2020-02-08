import React from 'react'
import axios from 'axios'
import {APP_URL} from '../resources/config'
import {Link} from 'react-router-dom'
import {CardText,Row, Col, Container, Card} from 'reactstrap'
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'
import { getCart } from '../redux/action/cart'
import { connect } from 'react-redux'

const token = Cookie.get('token')
let decode = ''
if(token){
  decode = Jwt(token)
}

class Checkout extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      data: null,
      id:decode.id,
      id_item : null,
      isFetched:false,
      Subtotal:0,
      isLoading:false
    }
  }

  async componentDidMount(){
    const {id} = this.props.match.params
      const url = APP_URL.concat(`carts/${id}`)
      // eslint-disable-next-line eqeqeq
      if(id == decode.id){
        this.props.dispatch(getCart(id))
      const item = await axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + token
        }
      })
      const {data} = item
      this.setState({data, isFetched:!this.state.isFetched})
      this.setState({quantity: data.data.map( v=>(v.quantity))})
      this.setState({Subtotal: data.Subtotal})
    }
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
        <Row key={v.id_item}>         
          <Col md={2}>
          <hr/> 
          <img src={APP_URL.concat(`src/assets/${v.image}`)} alt={v.name_item} className="img-thumbnail"  />
          </Col>
          <Col md={2} style={{marginTop:50}}>
          <CardText style={{fontSize:14, textAlign:'center'}}><b>{v.name_item}</b></CardText>
          </Col>
          <Col md={2} style={{marginTop:50}}>
          <CardText style={{fontSize:14, textAlign:'center'}}><b>IDR {v.price}</b></CardText>
          </Col>
          <Col md={2} style={{marginTop:50}} >
          <div key={v.id_item} style={{textAlign:'center'}}>
          <input type="text" disabled className="text-center" value={v.total_item} style={{ width:'40%', height:35}} />         
          </div>
          </Col>
          <Col md={2} style={{marginTop:50}}>
          <CardText style={{fontSize:14, textAlign:'center'}}><b>IDR {v.price * v.total_item}</b></CardText>
          </Col>
          <Col md={1}>
          </Col>
        </Row>
          ))}  
        </div>
      </div>
      </Col>
 


      <Col md={2} style={{marginTop:'20px'}}>
      </Col>
      <Col md={6} style={{marginTop:'20px'}}>
      </Col>
      <Col md={4} style={{marginTop:'20px'}}>
<Card body outline color="danger">
   <div class="card-body">
        <CardText>Total price:</CardText>
        <CardText><b>IDR {this.state.Subtotal}</b></CardText>
        <Link className="btn btn-success" color='success' style={{textAlign:'center', marginTop:20, fontSize:'12px'}} to={`/Riview/${this.state.id}`}>CONFIRM</Link>
         </div>
         </Card>       
      </Col>

    </Row>

  
  </Container>
      )
  }
}
const mapStateToProps = state =>{
  return{
      cart: state.cart
  }
}

export default connect (mapStateToProps) (Checkout)

