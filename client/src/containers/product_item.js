import React, { Component } from 'react';
import { Image, Row, Col, Well, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


export class ProductItem extends Component {

  constructor(){
    super();
    this.state = {
      isClicked: false
    }
  }

  onReadMore() {
    this.setState({isClicked: true});
  }

  render() {
    return(
      <Well>
        <Row>
          <Col xs={12} sm={4}>
            <Image src={this.props.image} responsive/> 
          </Col>
          <Col>
            <h6>{this.props.name}</h6>
            <p>{(this.props.description.length > 50 && this.state.isClicked === false)
              ?(this.props.description.substring(0, 50))
              :(this.props.description)}
              <button className='link' onClick={this.onReadMore.bind(this)}>
                {(this.state.isClicked === false && this.props.description !== null
                && this.props.description.length > 50)
                ?('...read more')
                :('')}
              </button>
            </p>
            <h6>${this.props.price}</h6>
          </Col>
        </Row>
      </Well>  
    )
  }
}