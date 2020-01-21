import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {APP_URL} from '../resources/config'
import {
    InputGroupAddon,
    Row, Col, 
    Container, Button, 
    DropdownItem, 
    UncontrolledDropdown, 
    DropdownToggle, 
    DropdownMenu } from 'reactstrap';
  
const peopleList={
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
      width: '100px',
      height: '100px',
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


class Menu extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data : {},
            isFetched : false
        }
    }

    async componentDidMount(){
        const {id} =this.props.match.params
        const url =APP_URL.concat(`restaurants/menu/${id}`)
        const item =await axios.get(url)
        const {data} =item        
        this.setState({data, isFetched:!this.state.isFetched})
    }

    prevButton=async()=>{
        const url=this.state.data.info.prev
        if(url){
            const {data}=await axios.get(url)
            this.setState({data})
        }
    }

    nextButton=async()=>{
        const url=this.state.data.info.next
        if(url){
            const {data}=await axios.get(url)
            this.setState({data})
        }
    }

    render(){
    const {isFetched, data}=this.state
    return(
<Container style={{backgroundColor:"#fafefa"}}> 
    <div style={{backgroundColor:"#fff"}}>
	    <div className="container-fluid d-md-flex align-items-stretch" style={{width:'100%', backgroundColor:"#fafefa"}}>
            <Container fluid style={{backgroundColor:"#fafefa"}} >
                <Row style={{backgroundColor:"#fafefa", marginTop:'20px'}}>
                    <Col md={12} style={{marginLeft:'20px'}}>
                        <Row style={{backgroundColor:'#fafefa', padding:10, paddingBottom:20}} >
                            <Row>
                    {isFetched&&data.data.map(v=>(
                    <Col md={3} key={v.id_item} className='shadow-sm' style={{borderRadius:'30px', marginRight:'10px', marginBottom:20, backgroundColor:'#fff'}}>                     
                        <div style={peopleList.wrapper}>
                            <div style={peopleList.info}>
                                <div style={peopleList.profileImg}>
                                    <div style={peopleList.img}>
                                        <img src={APP_URL.concat(`src/assets/${v.image}`)} alt={v.name} style={{width:'100px', height:'100px'}}/>
                                    </div>
                                </div>
                        
                        <div style={peopleList.centerizeRow} className='mt-4'>
                            <span style={peopleList.bold}>{v.name_item}</span>
                        </div>                          
                            </div>
                        
                        <div style={{...peopleList.centerizeRow,...peopleList.msgBox}}>
                        <Link style={{marginRight:'10px'}} className="btn btn-info" to={`/detailitem/${v.id}`}>
                        <icon className="fa fa-cart-plus mr-1" style={{color:'#fff'}}>
                        </icon>
                        </Link>
                            </div>
                        </div>
                    </Col>))}
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
</Container>
        )
    }
}

export default Menu;