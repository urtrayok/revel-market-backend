import React, { Component } from 'react';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class PageCommingSoon extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center" style={{height:'75vh;'}}>
        <Container>
          <Row className="justify-content-center" >
            <Col md="6">
              <span className="clearfix">
                <h1 className="float-left display-3 mr-4" >coming</h1>
              </span>
              <span className="clearfix">
                <h2 className="pt-3">soon..</h2>
              </span>
             
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}

export default PageCommingSoon;
