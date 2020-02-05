import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {APP_URL} from '../resources/config'
import {
  
  Row, Col, 
  Container, 
  Card, 
  CardImg, 
  CardBody, 
CardTitle } from 'reactstrap';
  

class Restaurants extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data : {},
            isFetched : false
        }
    }

    async componentDidMount(){
        const {data}=await axios.get(APP_URL.concat('restaurants'))
        this.setState({data, isFetched:!this.state.isFetched})
    }

    render(){
    const {isFetched, data}=this.state
    return(
        <Container>
       
    <Row>       
    <Row>
    {isFetched&&data.data.map(v=>(
      <Col sm="3" key={v.id_restaurant} style={{ marginBottom:15, borderRadius:20}}>
      <Card>
        <CardImg top style={{width:"100%", height:"150px"}} src={APP_URL.concat(`src/assets/${v.logo}`)} alt="Card image cap"/>
        <CardBody style={{height:'100px'}}>
          <CardTitle style={{fontSize:'10px'}}><b>{v.name_rest}</b></CardTitle>
          <Link style={{marginRight:'10px'}} className="btn btn-info" to={`/restaurants/menu/${v.id_restaurant}`}><a style={{fontSize:'12px'}}>Menu</a></Link>
          <Link style={{marginRight:'10px'}} className="btn btn-info" to={`/detailrestaurant/${v.id_restaurant}`}><a style={{fontSize:'12px'}}>Detail</a></Link>
        </CardBody>
      </Card>
      </Col>
              ))}
      
    </Row>
    </Row>
   
        </Container>
        
        )
    }
}

export default Restaurants;