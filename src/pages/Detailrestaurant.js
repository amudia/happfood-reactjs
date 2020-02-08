import React from 'react'
import {APP_URL} from '../resources/config'
import {CardText,CardTitle,Row, Col, Container} from 'reactstrap'
import { getDetailrestaurant } from '../redux/action/Detailrestaurant'
import { connect } from 'react-redux';

class Detailrestaurant extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      data: null,
        isFetchedDataRest:false,
        paramsId_item:null,

    }
  }

  async componentDidMount(){
    const {id} =this.props.match.params
    this.props.dispatch(getDetailrestaurant(id))
    this.setState(
      {isFetchedDataItem:true, paramsId_item : id})
  }
  

  render() {
    return (
<Container fluid style={{backgroundColor:"#fafefa"}}> 
{
  this.props.detailrestaurant.data.map((v, i)=>(
  <Row style={{backgroundColor:'#fafefa'}} key={v.i} >       
    <Col md={11} className='shadow-sm' style={{paddingBottom:20 ,marginLeft:30, marginTop:30, marginRight:30, backgroundColor:'#fff', borderRadius:20}}>
      <div className="mb-3 mt-3 ml-3 mr-3" body>
      <div className="row">
      <div style={{textAlign:"center", marginTop:60}} className="col-md-6">
      <img src={APP_URL.concat(`src/assets/${v.logo}`)} alt="" className="imgDetailItem" width="300px" height="300px" style={{textAlign:"center"}} />
      <br/><br/><br/>
      </div>

      <div className="col-md-5 ml-5" style={{marginTop:60}}>
        <CardTitle style={{fontSize:'20px'}}><b>{v.name_rest}</b></CardTitle>
        <CardText style={{fontSize:14}}><b>Location :</b>       {v.desc_rest}</CardText>
      </div>   
      </div>
      </div>
      
       

    </Col>   
  

  </Row>
      )
      )}
                
</Container>    
          )
  }
}
const mapStateToProps = state =>{
  return{
    detailrestaurant : state.detailrestaurant,
  }
}


export default connect (mapStateToProps) (Detailrestaurant)
