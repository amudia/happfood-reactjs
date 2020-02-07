import React, { Component } from 'react'
import axios from 'axios'
import { Container } from "reactstrap";
import {Link} from 'react-router-dom'
import { Card, CardImg, CardSubtitle, CardBody,Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import {APP_URL} from '../resources/config'
import { getItems } from '../redux/action/items'
import { connect } from 'react-redux'

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
         data:[],
         isLoading :false,

        }
    }
    async componentDidMount(){
      this.props.dispatch(getItems())
      this.setState({isLoading:true})
    }

    prevButton = async()=>{
      const url = this.state.data.info.previous
      if(url){
        const {data} = await axios.get(url)
        this.setState({data})

      }   
    }
  
    nextButton = async()=>{
      const url = this.state.data.info.next
      if(url){
        const {data} = await axios.get(url)
        this.setState({data})

      }
    }

render(){
    return(
<Container >
    <Row>
    <Col md='4' >
    <div class="input-group mb-3">
  <div class="input-group-prepend">
    <label class="btn btn-outline-secondary" for="inputGroupSelect01" style={{fontSize:'12px'}}>SORT</label>
  </div>
  <select class="custom-select" id="inputGroupSelect01" style={{fontSize:'12px'}}>
    <option selected> </option>
    <option value="1">Rating</option>
    <option value="2">Category</option>
    <option value="3">Price</option>
  </select>
</div>
    </Col>
    <Col md='4'>
    </Col>

    <Col md='4'>
    <div className="filter-list">
        <form>
        <fieldset className="form-group">
        <input style={{fontSize:'12px'}} type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList}/>
        </fieldset>
        </form>
      </div>    
    </Col>
    </Row>
    <hr/>
    <Row>
        
    <Row>
    {
    // !this.state.isLoading&&
    this.props.items.data.map(v=>(
      <Col sm="3" key={v.id_item} style={{ marginBottom:15, borderRadius:20}}>
      <Card style={{height:400}}>
        <CardImg top width="100%" height="250" src={APP_URL.concat(`src/assets/${v.image}`)} alt="Card image cap" />
        <CardBody>
          <CardTitle style={{fontSize:'12px'}}><b>{v.name_item}</b></CardTitle>
          <CardSubtitle style={{fontSize:'14px'}}>IDR {v.price}</CardSubtitle>
          <CardText style={{fontSize:'13px', marginBottom:10}}>{v.name_rest}</CardText>
          <Link style={{marginRight:'10px'}} className="btn btn-info" to={`/detailitem/${v.id_item}`}><icon className="fa fa-cart-plus mr-1" style={{color:'#fff'}}></icon></Link>
        </CardBody>
      </Card>
      </Col>
      ))}
      
    </Row>
    </Row>
    <Row className='mt-5 mb-5'>
                <Col md={6} className='text-center'>
                    <Button onClick={this.prevButton} color='primary' style={{fontSize:'12px'}}> Previous </Button>
                </Col>
                <Col md={6} className='text-center'>
                    <Button onClick={this.nextButton} color='primary' style={{fontSize:'12px'}}> Next </Button>
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