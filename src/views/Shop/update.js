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
import ShopModel from '../../models/ShopModel';
import UploadModel from '../../models/UploadModel';

var shop_model = new ShopModel;
var upload_model = new UploadModel;
class ShopUpdate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      shop_image_name: '',
      shop_code: null,
      file: null,
      imagePreviewUrl: '',
      upload_url: 'shop',
      position_marker: {
        lat: null,
        lng: null
      },
      show: false,
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
    const shop_code = this.props.match.params.shop_code;
    const shop_by_code = await shop_model.getShopByShopCode({ shop_code: shop_code });
    console.log(shop_by_code);

    let shop = shop_by_code.data[0]
    document.getElementById("shop_name").value = shop.shop_name;
    document.getElementById("shop_tel").value = shop.shop_tel;
    document.getElementById("shop_detail").value = shop.shop_detail;
    document.getElementById("shop_address").value = shop.shop_address;
    document.getElementById("shop_description").value = shop.shop_description;

    var shop_image = 'no-image.jpg'

    if (shop.shop_image_name != '') {
      shop_image = shop.shop_image_name
    }

    this.setState({
      show: true,
      shop_code: shop.shop_code,
      shop_image_name: shop_image,
      position_marker: {
        lat: shop.shop_latitude,
        lng: shop.shop_longitude
      }
    })
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
    let { position_marker, shop_code, shop_image_name } = this.state
    var arr = {};
    // var shop_code = document.getElementById("shop_code").value;
    var shop_name = document.getElementById("shop_name").value;
    var shop_tel = document.getElementById("shop_tel").value;
    var shop_detail = document.getElementById("shop_detail").value;
    var shop_address = document.getElementById("shop_address").value;
    var shop_description = document.getElementById("shop_description").value;


    if (shop_name == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Your Name ",
        icon: "warning",
        button: "Close",
      });

    } else if (shop_name == '') {
      swal({
        title: "Warning!",
        text: "Please Enter Your Lastname ",
        icon: "warning",
        button: "Close",
      });
    } else {

      var shop_image = ''
      if (this.state.file != null) {
        var image_name = await this.uploadImage(this.state.file, this.state.upload_url);
        if (image_name.upload_result) {
          shop_image = image_name.comment_photo_url
        }
      } else {
        shop_image = shop_image_name
      }


      arr['shop_name'] = shop_name;
      arr['shop_code'] = shop_code;
      arr['shop_tel'] = shop_tel;
      arr['shop_detail'] = shop_detail;
      arr['shop_address'] = shop_address;
      arr['shop_latitude'] = position_marker.lat;
      arr['shop_longitude'] = position_marker.lng;
      arr['shop_image_name'] = shop_image
      arr['shop_description'] = shop_description

      const shop = await shop_model.updateShopByShopCode(arr);
      console.log(shop);
      if (shop.query_result == true) {
        swal("Save success!", {
          icon: "success",
        });
        this.props.history.push('/shop');
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

    let { shop_code, position_marker, imagePreviewUrl, show } = this.state

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <Form onSubmit={this.handleSubmit} id="myForm">
                <CardHeader>
                  เเก้ไขร้าน / Update Shop
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col lg="4" className='img-upload-box'>
                      <Label className="label-upload">อัพโหลดภาพ</Label>
                      {imagePreviewUrl != '' ?
                        <img className="img-upload" src={imagePreviewUrl} style={{}} />
                        :
                        <img className="img-upload" src={GOBALS.URL_IMG + this.state.shop_image_name} />
                      }
                      <CustomInput key="key" type="file" id="exampleCustomFileBrowser" accept="image/x-png,image/gif,image/jpeg" name="customFile" multiple onChange={(e) => this._handleImageChange(e)} />
                    </Col>
                    <Col lg="8">
                      <FormGroup row>
                        <Col lg="6">
                          <FormGroup>
                            <Label>ชื่อร้าน / Shop Name <font color="#F00"><b>*</b></font></Label>
                            <Input type="text" id="shop_name" name="shop_name" class="form-control" />
                            <p class="help-block">Example : วินัย.</p>
                          </FormGroup>
                        </Col>
                        <Col lg="">
                          <FormGroup>
                            <Label>โทรศัพท์ / Mobile <font color="#F00"><b>*</b></font></Label>
                            <Input type="text" id="shop_tel" name="shop_tel" class="form-control" />
                            <p class="help-block">Example : ชาญชัย.</p>
                          </FormGroup>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col lg="6">
                          <FormGroup>
                            <Label>คำอธิบายของร้านค้า / Shop Description <font color="#F00"><b>*</b></font> </Label>
                            <Input type="textarea" id="shop_description" name="shop_description" class="form-control" rows="5" />
                            <p class="help-block">Example :.</p>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <Label>รายละเอียด / Detail <font color="#F00"><b>*</b></font> </Label>
                            <Input type="textarea" id="shop_detail" name="shop_detail" class="form-control" rows="5" />
                            <p class="help-block">Example :.</p>
                          </FormGroup>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col lg="12">
                          <FormGroup>
                            <Label>ที่อยู่ / Address <font color="#F00"><b>*</b></font> </Label>
                            <Input type="textarea" id="shop_address" name="shop_address" class="form-control" rows="5" />
                            <p class="help-block">Example : 271/55.</p>
                          </FormGroup>
                        </Col>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col md="12" lg={{ size: 6, offset: 3 }} style={{ height: "400px", justifyContent: 'center', alignItems: 'center', }}>
                      {show ?
                        <Map
                          google={this.props.google}
                          zoom={14}
                          style={mapStyles}
                          initialCenter={{
                            lat: position_marker.lat != null ? position_marker.lat : 14.9722863,
                            lng: position_marker.lng != null ? position_marker.lng : 102.0946554
                          }}
                          onClick={this.mapClicked}
                        >
                          {position_marker.lat != null && position_marker.lng != null ?
                            <Marker
                              position={position_marker}
                              draggable={true}
                              name={'Current location'}
                            // mouseover={this.moveMarker}
                            />
                            : ""
                          }
                        </Map>
                        : ""}
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

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAeM9FDyE4Eo9CWkydmq2wUmcum7FRnpx0")
})(ShopUpdate);

