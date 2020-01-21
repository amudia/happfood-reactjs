import React from 'react'
import axios from 'axios'
import {APP_URL} from '../resources/config'
import {Link} from 'react-router-dom'
import {CardText,CardTitle,Row, Col,Button, Container, Card,CardHeader, CardBody} from 'reactstrap'
 
const peopleList ={
  wrapper: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '10px'
    },
    info: {
      border: '0px solid #ccc',
      borderBottom: 0,
    },
    bold:{
      fontWeight: 'bold',
      color: '#0073b1',
      fontSize: 13
    },
    profileImg: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    img: {
      alignItems: 'center',
      width: '150px',
      height: '150px',
    },
    centerizeRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    centerizeCol: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '50px'
    },
    addText: {
      color: '#000',
      fontSize: '12px',
      fontWeight:'bold'
    },
    msgBox: {
      border: '0px solid #ccc',
      padding: '10px',
      cursor: 'pointer'
    }
}


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
    const url =APP_URL.concat(`restaurants/${id}`)
    const restaurant =await axios.get(url)
    const {data} =restaurant
    this.setState({data,isFetchedDataRest:true})
  }
  

  render() {
    const {isFetchedDataRest, data, paramsId_item}=this.state
    if(paramsId_item!=this.props.match.params&&paramsId_item!=null){
      this.componentDidMount()
    }
    return (
<Container fluid style={{backgroundColor:"#fafefa"}}> 
  {isFetchedDataRest&& 
  <Row style={{backgroundColor:'#fafefa'}} >       
    <Col md={11} className='shadow-sm' style={{paddingBottom:20 ,marginLeft:30, marginTop:30, marginRight:30, backgroundColor:'#fff', borderRadius:20}}>
      <div className="mb-3 mt-3 ml-3 mr-3" body>
      <div className="row">
      <div style={{textAlign:"center", marginTop:60}} className="col-md-6">
      <img src={APP_URL.concat(`src/assets/${data.data[0].logo}`)} alt="" className="imgDetailItem" width="300px" height="300px" style={{textAlign:"center"}} />
      <br/><br/><br/>
      </div>

      <div className="col-md-5 ml-5" style={{marginTop:60}}>
        <CardTitle style={{fontSize:'20px'}}><b>{data.data[0].name_rest}</b></CardTitle>
        <CardText style={{fontSize:14}}><b>Location :</b>       {data.data[0].desc_rest}</CardText>
      </div>   
      </div>
      </div>
      
       

    </Col>   
  

  </Row>
  }
              
</Container>    
          )
  }
}
export default Detailrestaurant;
