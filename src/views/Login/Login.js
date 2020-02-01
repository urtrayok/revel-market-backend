import React, { Component } from 'react';
import swal from 'sweetalert';
// Import Bootstrap source files

import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import UserModel from '../../models/UserModel';

var user_model = new UserModel;
class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      fireRedirect: false
    }
  }
  async componentDidMount() {

  }

  async handleSubmit(event) {
    event.preventDefault();
    var arr = {};
    var user_username = document.getElementById("user_username").value;
    var user_password = document.getElementById("user_password").value;
    if (user_username == '') {
      swal({
        title: "Warning!",
        text: "Please Check Your Username ",
        icon: "warning",
        button: "Close",
      });

    } else if (user_password == '') {
      swal({
        title: "Warning!",
        text: "Please Check Your Password ",
        icon: "warning",
        button: "Close",
      });
    } else {
      arr['user_username'] = user_username;
      arr['user_password'] = user_password;
      const user_login = await user_model.getLogin(arr);
      if (user_login) {
        localStorage.setItem('user_login', JSON.stringify(user_login));
        window.location.reload()
      } else {
        swal({
          title: "Warning!",
          text: "Please Check Your  Username  Or Password ",
          icon: "warning",
          button: "Close",
        });

      }
    }

  }
  render() {


    return (

      <Form onSubmit={this.handleSubmit} id="myForm" style={{backgroundColor:'#212121'}}>
        <div>
          <Container className="flex-login">
            <Row className="justify-content-center">
              <Col md="6">
                <CardGroup>
                  <Card className="p-4  background-login-card">
                    <CardBody>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-user-o"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="user_username" name="user_username" placeholder="Username" aria-describedby="inputGroupPrepend21"  />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="user_password" name="user_password" placeholder="Password"  />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" id="login_btn" name="login_btn" className="px-4"  >Login</Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </Form>
    );
  }
}


export default Login;

