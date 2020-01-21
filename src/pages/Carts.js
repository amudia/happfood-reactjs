import React from 'react'
import axios from 'axios'
import {APP_URL} from '../resources/config'
import {Link} from 'react-router-dom'
import {CardText,CardTitle,Row, Col,Button, Container, Card,CardHeader, CardBody} from 'reactstrap'
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'

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
      isFetched:false,
      subtotal:0
    }
  }

  async componentDidMount(){
    const {id} = this.props.match.params
      const url = APP_URL.concat(`carts/${id}`)
      if(id == decode.id){
      const item = await axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + token
        }
      })
      const {data} = item
      this.setState({data, isFetched:!this.state.isFetched})
      this.setState({subtotal: data.subtotal})
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
  var subtotal = 0
  data.filter(v=>{
      var total1 = v.price * v.total_item
      subtotal += total1;
  })
  this.setState({subtotal: subtotal})
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
    var subtotal = 0
    data.filter(v=>{
        var total1 = v.price * v.total_item
        subtotal += total1;
    })
    this.setState({subtotal: subtotal})
  }
  
  deleteCart = async (id) =>{
    const id_user = decode.id
    const url = APP_URL.concat(`carts/delete`)
    console.log(id_user,id)
    await axios.delete(url,{ data: { id_user: id_user, id_item: id }})
    this.setState({isFetched: false})
    this.componentDidMount();
  }
  render() {
    const {isFetched, data}=this.state

    return (
<Container>
  <Row >
  
      <Col md={12} >
      <div class="card" >
        <div class="card-body">
                {isFetched&&
        data.data.map((v,i)=>(
        <Row key={v.id_item}>         
          <Col md={2}>
          <hr/> 
          <img src={APP_URL.concat(`src/assets/${v.image}`)} alt="" className="img-thumbnail"  />
          </Col>
          <Col md={2} style={{marginTop:50}}>
          <CardText style={{fontSize:14, textAlign:'center'}}><b>{v.name_item}</b></CardText>
          </Col>
          <Col md={2} style={{marginTop:50}}>
          <CardText style={{fontSize:14, textAlign:'center'}}><b>IDR {v.price}</b></CardText>
          </Col>
          <Col md={2} style={{marginTop:50}} >
          <div key={v.id_item.toString} style={{textAlign:'center'}}>
          <Button color='' onClick={()=>this.buttonClickMin(v.id_item)}
          disabled={this.state.qty <=1 ?true : false} 
          style={{height:36, width:35}} className="btn btn-outline-danger">-</Button>
          <input type="text" className="text-center" value={v.total_item} style={{ width:'40%', height:35}} />         
          <Button color='' onClick={()=>this.buttonClickPlus(v.id_item, v.total_item, v.price)} 
          style={{height:36, width:35}} className="btn btn-outline-danger">+</Button><br/><br/><br/>
          </div>
          </Col>
          <Col md={2} style={{marginTop:50}}>
          <CardText style={{fontSize:14, textAlign:'center'}}><b>IDR {v.price * v.total_item}</b></CardText>
          </Col>
          <Col md={1}>
          <Button onClick = {()=>this.deleteCart(v.id_item)} color='danger' style={{textAlign:'center', marginTop:50}}><icon className="fa fa-trash text-center"></icon></Button>
          </Col>
        </Row>
          ))}  
        </div>
      </div>
      </Col>
 


      <Col md={2} style={{marginTop:'20px'}}>
      <div class="card">
        <div class="card-body">
          <Link to='/' className="btn btn-primary" style={{fontSize:'11px', backgroundColor:'#000'}}>CONTINUE BROWSING</Link>
        </div>
      </div>
      </Col>
      <Col md={6} style={{marginTop:'20px'}}>
      </Col>
      <Col md={4} style={{marginTop:'20px'}}>
<Card body outline color="danger">
   <div class="card-body">
        <CardText>Total price:</CardText>
        <CardText><b>IDR {this.state.subtotal}</b></CardText>
        <Button color='success' style={{textAlign:'center', marginTop:20, fontSize:'12px'}}>CHECK OUT</Button>
         </div>
         </Card>       
      </Col>

    </Row>

  
  </Container>
      )
  }
}
export default Carts;


