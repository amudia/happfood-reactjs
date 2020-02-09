import React, { Component } from 'react'
import { Container } from "reactstrap";
import {Link} from 'react-router-dom'
import {Card, CardImg, CardSubtitle, CardBody,Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import {APP_URL} from '../resources/config'
import { getItems } from '../redux/action/items'
import { nextItems } from '../redux/action/items'
import { connect } from 'react-redux'
import StarRatingComponent from 'react-star-rating-component';
import Axios from 'axios';

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
         data:[],
         categories:[],
         rating:'',
         name_item:'',
         categorySelected:'',
         isLoading :false,
         isFetchedData:false

        }
    }
    async componentDidMount(){
      await this.props.dispatch(getItems())
      console.log(this.props.items)
      const url = APP_URL.concat(`categories`)
      const user = await Axios.get(url)
      const {data} = user
      console.log(data)

      this.setState({isLoading:true, data, isFetched:true})
    }


    nextItems = async(nextURL) => {
      await this.props.dispatch(nextItems(nextURL))
    }
    prevItems = async(nextURL) => {
      await this.props.dispatch(nextItems(nextURL))
    }

    search = async() => {
      const {name_item, rating, categorySelected} = this.state
      const query = `http://localhost:4040/items?search[name_item]=${name_item}&search[rating]=${rating}&search[id_category]=${categorySelected}`
      await this.props.dispatch(nextItems(query))
    }

render(){
  const {name_item,isFetched, data, isLoading}=this.state

    return(
<Container >
    <Row>
    <Col md='2' >
  <div className="input-group mb-3">
  <div className="input-group-prepend">
    <label className="btn btn-outline-secondary" style={{fontSize:'12px', height:37}}>SORT</label>
  </div>
  <select className="custom-select" id="inputGroupSelect01" style={{fontSize:'12px', height:37}}>
    <option defaultValue value> </option>
    <option value="1">Rating</option>
    <option value="2">Category</option>
    <option value="3">Price</option>
  </select>
</div>
    </Col>
    <Col md='2' >
    </Col>
    <Col md='3'>
    <div className="filter-list">
        <form>
        <fieldset className="form-group">
        <input value={name_item} onChange={(e) => this.setState({name_item: e.target.value})} style={{fontSize:'12px'}} type="text" className="form-control form-control-lg" placeholder="Search item" />
        </fieldset>
        </form>
      </div>    
    </Col>
    <Col md='2'>
    <div className="input-group" >
      <select onChange={(e) => this.setState({rating: e.target.value})} className="custom-select" id="inputGroupSelect01" style={{fontSize:'12px', height:37}}>
        <option defaultValue value=''>All Rating</option>
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>
    </div>   
    </Col>
    <Col md='2'>
    <div className="input-group" >
      <select onChange={(e) => this.setState({categorySelected: e.target.value})} className="custom-select" id="inputGroupSelect01" style={{fontSize:'12px', height:37}}>
        <option defaultValue value="">All Category</option>
        {isFetched&&data.data.map((v,i)=>(
<option key={i} value={v.id_category}>{v.name_category}</option>
        ))}
      </select>
    </div>   
    </Col>
    <Col md='1'>
    <div className="filter-list">
      <Button onClick={this.search} color="success" style={{fontSize:"13px", height:35}}><i className="fa fa-search mr-1" style={{color:'#fff'}}></i></Button>
    </div>    
    </Col>
    </Row>
    <hr/>
        
    <Row>
    {
    !this.props.items.isLoading&&
    this.props.items.data.data&&
    this.props.items.data.data.map(v=>(
      <Col sm="3" key={v.id_item} style={{ marginBottom:15, borderRadius:20}}>
      <Card style={{height:370}} className="shadow-sm">
        <CardImg top width="100%" height="50%" src={APP_URL.concat(`src/assets/${v.image}`)} alt="Card image cap" />
        <CardBody>
          <Row style={{height:25,paddingLeft:10}}>
          <StarRatingComponent value = {v.rating} editing={false} emptyStarColor="white"  starColor="orange" numberOfStars={5} starDimension = "15px" />
          </Row>
          <Row style={{height:35,paddingLeft:10}}>
          <CardTitle style={{fontSize:'11px'}}><b>{v.name_item}</b></CardTitle>
          </Row>
          <Row style={{height:25,paddingLeft:10}}>
          <CardSubtitle style={{fontSize:'14px', fontWeight:'bold', color:'green'}}>IDR {v.price}</CardSubtitle>
          </Row>
          <Row style={{height:35,paddingLeft:10}}>
          <CardText style={{fontSize:'11px'}}>{v.name_rest}</CardText>
          </Row>
          <Row style={{height:35,paddingLeft:10, alignSelf :'right'}}>
          <Link style={{marginRight:'10px'}} className="btn btn-info" to={`/detailitem/${v.id_item}`}><i className="fa fa-cart-plus mr-1" style={{color:'#fff'}}></i></Link>
          </Row>
        </CardBody>
      </Card>
      </Col>
      ))}
    </Row>
      <Row className='mt-5 mb-5'>
        <Col md={6} className='text-center'>
        {!this.props.items.isLoading&&this.props.items.data.info.previous&&
            <Button onClick={() => this.nextItems(this.props.items.data.info.previous)} color='primary' style={{fontSize:'12px'}}> Previous </Button>
          }
        </Col>
        <Col md={6} className='text-center'>
        {!this.props.items.isLoading&&this.props.items.data.info.next&&
            <Button onClick={() => this.nextItems(this.props.items.data.info.next)} color='primary' style={{fontSize:'12px'}}> Next </Button>
          }
        </Col>
      </Row>
</Container>
    )
}
}

const mapStateToProps = state =>{
  return{
      items: state.items
  }
}

export default connect (mapStateToProps) (Home)