import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody, Table, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import swal from 'sweetalert';


import ShopModel from '../../models/ShopModel';
var shop_model = new ShopModel;


class ShopView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shop_list: []
    };
  }

  async componentDidMount() {
    const shop_list = await shop_model.getShopBy({keyword:''});
    console.log(shop_list);
    this.setState({
      shop_list: shop_list.data
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
          shop_model.deleteShopByShopCode({ shop_code: code }).then((res) => {
            swal("success deleted!", {
              icon: "success",
            });
            this.componentDidMount()
          })
        }
      });
  }

  render() {
    const { shop_list } = this.state;
    console.log('shop_list', shop_list);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                จัดการร้าน / Shop Management
                <NavLink exact to={`/shop/insert/`} style={{ width: '100%' }}>
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
                      {/* <th >อีเมล์</th> */}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {shop_list.map((item, idx) => (
                      <tr>
                        <td >{(idx + 1)}</td>
                        <td >{item.shop_code}</td>
                        <td >{item.shop_name}</td>
                        <td >{item.shop_tel}</td>
                        {/* <td >{item.shop_detail}</td> */}
                        <td>
                          <div>
                            <NavLink exact to={`/shop/update/` + item.shop_code} style={{ color: '#337ab7' }}>
                              <i class="fa fa-pencil-square-o" ></i>
                            </NavLink>
                            <Button type="button" size="sm" color="link" style={{ color: 'red' }}
                              onClick={() => this.onDelete(item.shop_code)}   >
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


export default (ShopView);

