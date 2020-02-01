import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody, Table, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import swal from 'sweetalert';


import NewsModel from '../../models/NewsModel';
var news_model = new NewsModel;


class NewsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      news_list: []
    };
  }

  async componentDidMount() {
    const news_list = await news_model.getNewsBy();
    console.log(news_list);

    this.setState({
      news_list: news_list.data
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
          news_model.deleteNewsByNewsCode({ news_code: code }).then((res) => {
            swal("success deleted!", {
              icon: "success",
            });
            this.componentDidMount()
          })
        }
      });
  }

  render() {
    const { news_list } = this.state;
    console.log('news_list', news_list);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                จัดการร้าน / News Management
                <NavLink exact to={`/news/insert/`} style={{ width: '100%' }}>
                  <button class="btn btn-primary btn-lg float-right boottom-header"><i class="fa fa-plus"></i> Add</button>
                </NavLink>

              </CardHeader>
              <CardBody>

                <Table>
                  <thead>
                    <tr>
                      <th >ลำดับ</th>
                      <th >รหัส</th>
                      <th style={{ width: "20%" }}>พาดหัวข่าว</th>
                      <th >บทย่อ</th>
                      <th >เนื้อหาข่าว</th>
                      <th style={{ width: "10%" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {news_list.map((item, idx) => (
                      <tr>
                        <td >{(idx + 1)}</td>
                        <td >{item.news_code}</td>
                        <td >{item.news_title}</td>
                        <td >{item.news_deciption}</td>
                        <td >{item.news_detail}</td>
                        <td>
                          <div>
                            <NavLink exact to={`/news/update/` + item.news_code} style={{ color: '#337ab7' }}>
                              <i class="fa fa-pencil-square-o" ></i>
                            </NavLink>
                            <Button type="button" size="sm" color="link" style={{ color: 'red' }}
                              onClick={() => this.onDelete(item.news_code)}   >
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


export default (NewsView);

