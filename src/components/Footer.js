import React, { Component } from 'react'
import {Container, Col, Row} from 'reactstrap'

export default class Footer extends Component {
  render() {
    return (
      <Container>
        <hr />
        <Row>
          <Col>
            <div>happyfood</div>
            <Row>
              <Col>
              <div style={{marginTop:10, marginBottom:10}}>
                <ul style={{listStyleType:'none',margin:0,padding:0, color:'#485d69',fontWeight:'bold',fontSize:12}}>
                  <li>About</li>
                  <li>Career</li>
                  <li>Advertising</li>
                  <li>Small Business</li>
                </ul>
              </div>
              </Col>
              <Col>
              <div style={{marginTop:10, marginBottom:10}}>
                <ul style={{listStyleType:'none',margin:0,padding:0, color:'#485d69',fontWeight:'bold',fontSize:12}}>
                  <li>About</li>
                  <li>Career</li>
                  <li>Advertising</li>
                  <li>Small Business</li>
                </ul>
              </div>
              </Col>
              <Col md={7}/>
            </Row>
            <div className='mb-5'>
              <span style={{fontSize:12}}>happyfood &copy; 2020</span>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
