import React from 'react'
import {Link} from 'react-router-dom'
import {APP_URL} from '../resources/config'
import {
  
  Row, Col, 
  Container, 
  Card, 
  CardImg, 
  CardBody, 
CardTitle } from 'reactstrap';
import { getRestaurants } from '../redux/action/restaurants'
import { connect } from 'react-redux'

  

class Restaurants extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data : [],
            isFetched : false,
            isLoading :false,

        }
    }

    async componentDidMount(){
      this.props.dispatch(getRestaurants())
      this.setState({isLoading:true})
    }

    render(){
    return(
        <Container>
       
    <Row>       
    <Row>
    {
    // !this.state.isLoading&&
    this.props.restaurants.data.map(v=>(
      <Col sm="3" key={v.id_restaurant} style={{ marginBottom:15, borderRadius:20}}>
      <Card>
        <CardImg top style={{width:"100%", height:"150px"}} src={APP_URL.concat(`src/assets/${v.logo}`)} alt="Card image cap"/>
        <CardBody style={{height:'100px'}}>
          <CardTitle style={{fontSize:'10px'}}><b>{v.name_rest}</b></CardTitle>
          <Link style={{marginRight:'10px', fontSize:12}} className="btn btn-info" to={`/restaurants/menu/${v.id_restaurant}`}>Menu</Link>
          <Link style={{marginRight:'10px', fontSize:12}} className="btn btn-info" to={`/detailrestaurant/${v.id_restaurant}`}>Detail</Link>
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

const mapStateToProps = state =>{
  return{
      restaurants: state.restaurants
  }
}

export default connect (mapStateToProps) (Restaurants)