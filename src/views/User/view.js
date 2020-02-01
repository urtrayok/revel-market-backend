import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody, Table, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import swal from 'sweetalert';


import UserModel from '../../models/UserModel';
var user_model = new UserModel;


class UserView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_list: [],
      user_login: JSON.parse(localStorage.getItem('user_login'))
    };
  }

  async componentDidMount() {
    var user_list = await user_model.getUserBy();
    var user_list_ = user_list.data.filter(val=>val.user_code == this.state.user_login.user_code)
    this.setState({
      user_list: user_list_
    })
  }
  async onDelete(code) {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          user_model.deleteUserBycode(code).then((res) => {
            if (res.query_result == true) {
              swal("Delete success!", {
                icon: "success",
              });
              this.componentDidMount()
            } else {
              swal({
                title: "Error!",
                text: " Error Delete ",
                icon: "error",
                button: "Close",
              });
            }
          })
        }
      });
  }
  render() {
    const { user_list } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                จัดการพนักงาน / User Management
                <NavLink exact to={`/user/insert/`} style={{ width: '100%' }}>
                  <button class="btn btn-primary btn-lg float-right boottom-header"><i class="fa fa-plus"></i> Add</button>
                </NavLink>

              </CardHeader>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                      <th >ลำดับ</th>
                      <th >รหัส</th>
                      <th >ชื่อ</th>
                      <th >โทรศัพท์</th>
                      <th >อีเมล์</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {user_list.map((item, idx) => (
                      <tr>
                        <td >{(idx + 1)}</td>
                        <td >{item.user_code}</td>
                        <td >{item.user_name}</td>
                        <td >{item.user_tel}</td>
                        <td >{item.user_email}</td>
                        <td>
                          <div>
                            <NavLink exact to={`/user/update/` + item.user_code} style={{ color: '#337ab7' }}>
                              <i class="fa fa-pencil-square-o" ></i>
                            </NavLink>
                            <Button hidden type="button" size="sm" color="link" style={{ color: 'red' }}
                              onClick={() => this.onDelete(item.user_code)}   >
                              <i class="fa fa-times" aria-hidden="true"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


export default UserView;

