import React, { Component } from 'react';
import {
  Form, FormGroup, Button,
  Card, CardHeader, Col,
  Row, CardBody, Label,
  Input, CardFooter, CustomInput
} from 'reactstrap';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import ImgDefault from '../../assets/img/default-image.jpg';
import GOBALS from '../../GOBALS';
import NewsModel from '../../models/NewsModel';
import UploadModel from '../../models/UploadModel';


var news_model = new NewsModel;

var upload_model = new UploadModel;
class NewsInsert extends Component {

  constructor(props) {
    super(props)
    this.state = {
      shop_code: "",
      file: null,
      imagePreviewUrl: '',
      upload_url: 'news',
      position_marker: {
        lat: null,
        lng: null
      }
    };
    this.uploadImage = this.uploadImage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.mapClicked = this.mapClicked.bind(this)
  }

  async uploadImage(file, upload_url) {
    const formData = new FormData();
    var res = file.name.split(".");
    formData.append('file_type', '.' + res[res.length - 1]);
    formData.append('upload_url', upload_url);
    formData.append('files', file);
    var res_upload = await upload_model.uploadFile(formData);
    return res_upload;
  }

  async componentDidMount() {


  }

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file != undefined) {
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
        });
      }
      reader.readAsDataURL(file)
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    let { position_marker } = this.state
    var arr = {};
    var news_title = document.getElementById("news_title").value;
    var news_description = document.getElementById("news_description").value;
    var news_detail = document.getElementById("news_detail").value;


    if (news_title == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Your News Title ",
        icon: "warning",
        button: "Close",
      });

    } else if (news_description == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Your News Deciption ",
        icon: "warning",
        button: "Close",
      });

    } else if (news_detail == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Your News Detail ",
        icon: "warning",
        button: "Close",
      });
    } else {
      var news_image_name = ''
      if (this.state.file != null) {
        var image_name = await this.uploadImage(this.state.file, this.state.upload_url);
        if (image_name.upload_result) {
          news_image_name = image_name.comment_photo_url
        }
      }
      arr['news_title'] = news_title;
      arr['news_description'] = news_description;
      arr['news_detail'] = news_detail;
      arr['news_show'] = "1"
      arr['news_image_name'] = news_image_name


      console.log(arr);
      const shop = await news_model.insertNews(arr);
      if (shop.query_result == true) {
        swal("Save success!", {
          icon: "success",
        });
        this.props.history.push('/news');
      } else {
        window.confirm("เพิ่มข้อมูลไม่สำเร็จ")
      }
    }
  }

  mapClicked(mapProps, map, ev) {
    const location = ev.latLng;
    this.setState({
      position_marker: {
        lat: location.lat(),
        lng: location.lng()
      }
    })
  }
  render() {

    let { shop_code, position_marker, imagePreviewUrl } = this.state

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <Form onSubmit={this.handleSubmit} id="myForm">
                <CardHeader>
                  เพิ่มข้อมูลข่าวสาร / Add News
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col lg="4" className='img-upload-box'>
                      <Label className="label-upload">อัพโหลดภาพ</Label>
                      {imagePreviewUrl != '' ?
                        <img className="img-upload" src={imagePreviewUrl} style={{}} />
                        :
                        <img className="img-upload" src={ImgDefault} style={{}} />
                      }
                      <CustomInput key="key" type="file" id="exampleCustomFileBrowser" accept="image/x-png,image/gif,image/jpeg" name="customFile" multiple onChange={(e) => this._handleImageChange(e)} />
                    </Col>
                    <Col lg="8">
                      <FormGroup row>
                        <Col lg="12">
                          <FormGroup>
                            <Label>พาดหัวข้อข่าว <font color="#F00"><b>*</b></font></Label>
                            <Input type="textarea" id="news_title" name="news_title" class="form-control" rows="5" />
                          </FormGroup>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col lg="12">
                          <FormGroup>
                            <Label>บทคัดย่อ  <font color="#F00"><b>*</b></font> </Label>
                            <Input type="textarea" id="news_description" name="news_description" class="form-control" rows="5" />
                          </FormGroup>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col lg="12">
                          <FormGroup>
                            <Label>เนื้อหาข่าว  <font color="#F00"><b>*</b></font> </Label>
                            <Input type="textarea" id="news_detail" name="news_detail" class="form-control" rows="10" />
                          </FormGroup>
                        </Col>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Link to="/master/employee"><Button type="buttom" size="sm" > Back </Button></Link>
                  <Button type="reset" size="sm" color="danger"> Reset</Button>
                  <Button type="submit" size="sm" color="primary">Save</Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
const mapStyles = {
  width: '95%',
  height: '100%',
  position: 'relative'
};

export default (NewsInsert);

