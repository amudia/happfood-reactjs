import React from 'react'
import axios from 'axios'
import {APP_URL} from '../resources/config'
import {Link} from 'react-router-dom'
import {CardText,Row, Col,Button, Container, Card} from 'reactstrap'
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'
import { getCart } from '../redux/action/cart'
import { connect } from 'react-redux'

const token = Cookie.get('token')
let decode = ''
if(token){
  decode = Jwt(token)
}

class Carts extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      data: null,
      id:decode.id,
      id_item : null,
      isFetched:false,
      Subtotal:0,
      isLoading:false,
      isFetchedDataItem:false
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

  buttonClickPlus = async(i)=>{
    const data = this.state.data.data
    console.log({data})
    const item = data.filter(v=>{
      if(v.id_item === i){
        v.total_item += 1
      }
      return v
    })
  this.setState({item})
  var Subtotal = 0
  // eslint-disable-next-line array-callback-return
  data.filter(v=>{
      var total1 = v.price * v.total_item
      Subtotal += total1;
  })
  this.setState({Subtotal: Subtotal})
}

  buttonClickMin = (i)=>{
    const data = this.state.data.data
      console.log({data})
      const item = data.filter(v=>{
        if(v.id_item === i){
          v.total_item -= 1
        }
        return v
      })
    this.setState({item})
    var Subtotal = 0
    // eslint-disable-next-line array-callback-return
    data.filter(v=>{
        var total1 = v.price * v.total_item
        Subtotal += total1;
    })
    this.setState({Subtotal: Subtotal})
  }
  
  // deleteCart = async (id) =>{
  //   const id_user = decode.id
  //   const url = APP_URL.concat(`carts/detele/`)
  //   await axios.delete(url,{ data: { id_item: id, id_user : id_user }})
  //   this.setState({isFetchedDataItem: false})
  //   this.componentDidMount();
  //   alert('Thanks')
  // }

  deleteCart = async (id) =>{
    const url = APP_URL.concat(`carts/${id}`)
    console.log(id)
    await axios.delete(url)
    this.setState({isFetchedDataItem: false})
    console.log(this.state.isFetchedDataItem)
    this.componentDidMount();
    alert('Thanks')
  }

  handleChange = (event,i)=>{
    this.setState({total_item: event.target.total_item[i]})
  }

  render() {
    return (
<Container>
    <Row  >  

      <Col md={12}  >
      <div className="card" >
        <div className="card-body">
        {!this.props.cart.isLoading&&
      this.props.cart.data&&
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
          <Button color='' onClick={()=>this.buttonClickMin(v.id_item)}
          disabled={this.state.qty <=1 ?true : false} 
          style={{height:36, width:35}} className="btn btn-outline-danger">-</Button>
          <input type="text" className="text-center" onChange={this.handleChange[v.id_item]} value={v.total_item} style={{ width:'40%', height:35}} />         
          <Button color='' onClick={()=>this.buttonClickPlus(v.id_item, v.total_item, v.price)} 
          style={{height:36, width:35}} className="btn btn-outline-danger">+</Button><br/><br/><br/>
          </div>
          </Col>
          <Col md={2} style={{marginTop:50}}>
          <CardText style={{fontSize:14, textAlign:'center'}}><b>IDR {v.price * v.total_item}</b></CardText>
          </Col>
          <Col md={1}>
          <Button onClick = {()=>this.deleteCart(v.id_cart)} color='danger' style={{textAlign:'center', marginTop:50}}><i className="fa fa-trash text-center"></i></Button>
          </Col>
        </Row>
         ))}

        </div>
      </div>
      </Col>
 

      <Col md={2} style={{marginTop:'20px'}}>
      <div className="card">
        <div className="card-body">
          <Link to='/' className="btn btn-primary" style={{fontSize:'11px', backgroundColor:'#000'}}>CONTINUE BROWSING</Link>
        </div>
      </div>
      </Col>
      <Col md={6} style={{marginTop:'20px'}}>
      </Col>
      <Col md={4} style={{marginTop:'20px'}}>
<Card body outline color="danger">
   <div className="card-body">
        <CardText>Total price:</CardText>
        <CardText><b>IDR {this.state.Subtotal}</b></CardText>
        <Link className="btn btn-success" color='success' style={{textAlign:'center', marginTop:20, fontSize:'12px'}} to={`/Checkout/${this.state.id}`}>CHECK OUT</Link>
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

export default connect (mapStateToProps) (Carts)

