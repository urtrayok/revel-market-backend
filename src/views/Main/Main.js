import React, { Component } from 'react';
import { Button, Label, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
class Main extends Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount() {

    console.log("componentDidMount Main");

  }

  render() {
    return (
      <div >
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4  background-login-card">
                  <CardBody>
                    <h1>Main Manu</h1>
                    <Row>
                      <Col xs="6">
                        <Col>
                          <NavLink exact to={`/login`} style={{ width: '100%' }}>
                            <Label> <li type="disc">  workshop 1  State  </li> </Label>
                          </NavLink>
                        </Col>
                        <Col>
                          <NavLink exact to={`/login`} style={{ width: '100%' }}>
                            <Label> <li type="disc">  workshop 2  </li> </Label>
                          </NavLink>
                        </Col>
                        <Col>
                          <NavLink exact to={`/login`} style={{ width: '100%' }}>
                            <Label> <li type="disc">  workshop 3  </li> </Label>
                          </NavLink>
                        </Col>
                        <Col>
                          <NavLink exact to={`/login`} style={{ width: '100%' }}>
                            <Label> <li type="disc">  workshop 4  </li> </Label>
                          </NavLink>
                        </Col>
                        <Col>
                          <NavLink exact to={`/login`} style={{ width: '100%' }}>
                            <Label> <li type="disc">  workshop 5  </li> </Label>
                          </NavLink>
                        </Col>
                        <Col>
                          <NavLink exact to={`/login`} style={{ width: '100%' }}>
                            <Label> <li type="disc"> Login </li>  </Label>
                          </NavLink>
                        </Col>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


export default Main;

