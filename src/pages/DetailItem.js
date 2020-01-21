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



class DetailItem extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      data: null,
      datariview: null,
        isFetchedDataItem:false,
        qty:1,
        paramsId_item:null,
        suggest: null

    }
  }

  async componentDidMount(){
    const {id} =this.props.match.params
    const url =APP_URL.concat(`items/${id}`)
    const item =await axios.get(url)
    const {data} =item

    const riview =APP_URL.concat(`riviews/${id}`)
    const riviews=await axios.get(riview)
    const datariview=riviews.data

    this.setState({data,datariview,isFetchedDataItem:true,paramsId_item:id})
  }
  

  buttonClickPlus =()=>{
    this.setState({qty: this.state.qty + 1})
  }

  buttonClickMin =()=>{
    this.setState({qty: this.state.qty - 1})
  }

  render() {
    const {isFetchedDataItem, data, datariview, paramsId_item}=this.state
    if(paramsId_item!=this.props.match.params&&paramsId_item!=null){
      this.componentDidMount()
    }
    return (
<Container> 
{isFetchedDataItem&& 
     <Row>

     <Col md={11} style={{paddingBottom:20 ,marginLeft:30, marginTop:30, marginRight:30}}>
     <hr/>

      <div className="mb-3 mt-3 ml-3 mr-3" body>
      <div className="row">
      <div style={{textAlign:"center", marginTop:60}} className="col-md-6">
      <img src={APP_URL.concat(`src/assets/${data.data[0].image}`)} alt="" className="imgDetailItem" width="300px" height="300px" style={{textAlign:"center"}} />
      <br/><br/><br/>
      </div>
      <div className="col-md-5 ml-5" style={{marginTop:60}}>
        <CardTitle style={{fontSize:'20px'}}><b>{data.data[0].name_item}</b></CardTitle>
        <CardText style={{fontSize:14}}><b>Restaurant : {data.data[0].name_rest}</b></CardText>
        <CardText style={{fontSize:14}}><b>IDR.</b>         {data.data[0].price}</CardText>
        <CardText style={{fontSize:14}}><b>Desc :</b>       {data.data[0].desc_item}</CardText>
        <CardText style={{fontSize:14}}><b>Rate :</b>       {data.data[0].rating}</CardText>
        <CardText style={{fontSize:14}}><b>QUANTITY</b></CardText>
      <Button onClick={this.buttonClickMin} 
      disabled={this.state.qty <=1 ?true : false} style={{height:52, width:40}} className="btn btn-dark">-</Button>
      <input type="text" className="text-center" value={this.state.qty} style={{margin:6, width:'20%', height:50}} />         
      <Button onClick={this.buttonClickPlus} style={{height:52, width:40}}>+</Button><br/><br/><br/>
      <Link className="btn btn-info btn-sm">Add to cart</Link>
      </div>   
      </div>
      </div>
      <hr/>
          {/* RIVIEWS */}
          <br/>
          <Card style={{paddingBottom:'20px'}}>
      <Card style={{marginTop:20,marginLeft:30, width:300}}>
        <CardHeader><a style={{font: 'italic bold 14px Georgia, serif'}}>Riviews</a></CardHeader>
    </Card>
      {isFetchedDataItem&&
    datariview.data.map(v=>(

      <Col md ={11} style={{paddingBottom:1 ,marginLeft:30, marginTop:10, marginRight:30, backgroundColor:'#fff', borderRadius:20}}>
      <Card body outline color="success" style={{marginTop:10}}>
          <CardBody>
            <CardTitle style={{fontSize:'12px'}}><b>{v.username}</b> </CardTitle>
            <CardText md key={v.id_item} style={{fontSize:'12px'}}><i>{v.riview}</i> </CardText>
          </CardBody>
        </Card> 
        </Col> 
        

    )
    )}
        </Card>
    

    </Col> 
    {/* SHOWCASE */}

    <Col md={12} style={{paddingBottom:50 ,marginLeft:0, marginTop:10, marginRight:30, backgroundColor:'#fff'}} >
    <Card style={{marginTop:20,marginLeft:30, width:300}}>
        <CardHeader><a style={{font: 'italic bold 14px Georgia, serif'}}>Similar items</a></CardHeader>
    </Card>
    
    <Row style={{ padding:20}}>  
    {isFetchedDataItem&&
    data.suggest.map(v=>(
      <Col md={2} key={v.id_item} className='shadow-sm' style={{marginLeft:24 , marginBottom:20, backgroundColor:'#fff'}}>
      <div style={peopleList.wrapper}>
          <div style={peopleList.info}>
            <div style={peopleList.profileImg}>
              <div style={peopleList.img}><img src={APP_URL.concat(`src/assets/${v.image}`)} alt={v.name} style={{width:'150px', height:'150px'}}/></div>
            </div>
              <div style={peopleList.centerizeRow} className='mt-4'>
                <span style={peopleList.bold}>{v.name_item}</span>
              </div>
              <div style={peopleList.centerizeCol}>
                <span style={peopleList.addText}>IDR. {v.price}</span>
                <span style={peopleList.addText} style={{fontSize:"10px"}} >{v.name_rest}</span>
              </div>
          </div>
              <div style={{...peopleList.centerizeRow,...peopleList.msgBox}}>
                <Link style={{marginRight:'10px'}} className="btn btn-info" to={`/detailitem/${v.id_item}`}><icon className="fa fa-cart-plus mr-1" style={{color:'#fff'}}></icon></Link>
              </div>
      </div>
      </Col>
    )
    )}
    </Row>
    </Col>  
     </Row>
  }
</Container>    
          )
  }
}
export default DetailItem;
