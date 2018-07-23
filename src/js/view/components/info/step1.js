import { InputItem, ImagePicker, Toast, Modal } from "antd-mobile";
import url from "../../config/config";
import $ from "jquery";
// import EXIF from "exif-js";
import { compress } from "../../../utils/imgCompress";
import idcard from "../method/idcard";
import { connect } from "react-redux";
var Home = React.createClass({
  getInitialState() {
    return {
      name: "",
      phone: localStorage.Phone,
      idcard: "",
      files: [],
      imgurl: "images/images/icon_08.jpg",
      imgurl2: "images/images/icon_06.jpg",
      imgurl3: "images/images/icon_07.jpg",
      upimg1: "",
      upimg2: "",
      upimg3: "",
      email: ""
    };
  },
  btn() {
    //保存身份接口
    //   111
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if (!/^[\u4e00-\u9fa5]{2,4}$/g.test(this.state.name)) {
      Toast.info("请输入正确的用户名", 2);
    } else if (!this.state.email) {
      Toast.info("请输入邮箱", 2);
    } else if (!reg.test(this.state.email)) {
      Toast.info("请输入正确的邮箱", 2);
    } else if (!this.state.idcard) {
      Toast.info("请输入身份证号码", 2);
    } else if (!idcard(this.state.idcard)) {
      Toast.info("请输入正确的身份号码", 2);
    } else if (!this.state.upimg1 || !this.state.upimg2 || !this.state.upimg3) {
      Toast.info("请上传身份证照片", 2);
    } else {
      var that = this;
      var data = new FormData();
      data.append("backImg", this.state.upimg2);
      data.append("frontImg", this.state.upimg1);
      data.append("livingImg", this.state.upimg3);
      data.append("idNo", this.state.idcard);
      data.append("phone", this.state.phone);
      data.append("email", this.state.email);
      data.append("realName", this.state.name);
      data.append("userId", localStorage.userId);
      fetch(url.url + "/api/act/mine/userInfo/save.htm", {
        headers: {
          token: localStorage.Token
        },
        method: "POST",
        body: data
      })
        .then(r => r.json())
        .then(data => {
          if (data.code == "200") {
            that.props.step(2);
          } else if (data.code == "400") {
            Toast.info(data.msg, 2);
          }
        })
        .catch(function(e) {
          Toast.info("服务器响应超时", 2);
        });
    }
  },
  step(e) {
    e.nativeEvent.preventDefault();
  },
  componentWillMount() {
    if (this.props.step1.phone) {
      this.setState(this.props.step1);
    } else {
      var that = this;
      $.ajax({
        type: "get",
        url: url.url + "/api/act/mine/userInfo/getUserInfo.htm",
        data: { userId: localStorage.userId },
        dataType: "json",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
          token: localStorage.Token
        },
        success: function(data) {
          that.setState({
            name: data.data.realName,
            email: data.data.email,
            idcard: data.data.idNo,
            imgurl: data.data.userFrontImg
              ? data.data.userFrontImg
              : "images/images/icon_08.jpg",
            imgurl2: data.data.userBackImg
              ? data.data.userBackImg
              : "images/images/icon_06.jpg",
            imgurl3: data.data.userLivingImg
              ? data.data.userLivingImg
              : "images/images/icon_07.jpg",
            upimg1: data.data.userFrontImg,
            upimg2: data.data.userBackImg,
            upimg3: data.data.userLivingImg
          });
          switch (data.code) {
            case 408:
              Toast.info("系统响应超时", 1);
              break;
            case 411:
              Toast.info("用户信息过期，请重新登录", 1);
              localStorage.clear();
              sessionStorage.clear();
              hashHistory.push("login");
              break;
            case 410:
              Toast.info("用户已在其他设备登录，请重新登录", 1);
              localStorage.clear();
              sessionStorage.clear();
              hashHistory.push("login");
              break;
            case 500:
              Toast.info("服务器错误", 1);
              break;
            case 170002:
              Toast.info("获取用户信息失败，请稍后再次尝试", 1);
              break;
            case 170003:
              Toast.info("获取用户信息超时，请稍后再次尝试", 1);
              break;
            default:
              break;
          }
        }
      });
    }
    this.setState({ modal1: false }); //每次进来确保加载框不出来
  },
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: "STEP1",
      data: this.state
    });
  },
  upimg(files) {
    var that = this;
    return new Promise(function(suc, err) {
      var data = new FormData();
      data.append("img", files[0].url);
      that.setState({ modal1: true }, () => {
        // console.log(data)
        fetch(url.url + "/api/act/mine/userInfo/saveImg.htm", {
          headers: {
            token: localStorage.Token
          },
          method: "POST",
          body: data
        })
          .then(r => r.json())
          .then(data => {
            that.setState({ modal1: false });
            if (!data.data) {
              if (data.code == 400) {
                // Toast.info("上传图片格式仅支持jpg，jpeg，png格式", 2);
              } else {
                Toast.info("图片上传错误", 2);
              }
            } else {
              suc(data);
            }
          })
          .catch(function(e) {
            that.setState({ modal1: false });
            Toast.info("服务器响应超时", 2);
          });
      });
      // return p;
    });
  },
  onChange(files, type, index) {
    var that = this;
    if (!this.judgeImgType(files[0].file.type)) {
      Toast.info("上传图片格式仅支持jpg，jpeg，png格式", 2);
      return;
    }
    this.upimg(files).then(data => {
      // var img = new Image();
      // var imgurl = "imgurl";
      // img.src = files[0].url;
      // var newimg = that.handelImg(img,1);
      that.setState({
        // imgurl:files[0].url,
        imgurl: data.data,
        upimg1: data.data
      });
    });
  },
  onChange2(files, type, index) {
    var that = this;
    if (!this.judgeImgType(files[0].file.type)) {
      Toast.info("上传图片格式仅支持jpg，jpeg，png格式", 2);
      return;
    }
    this.upimg(files).then(data => {
      that.setState({
        // imgurl2:files[0].url,
        imgurl2: data.data,
        upimg2: data.data
      });
    });
  },
  onChange3(files, type, index) {
    if (!this.judgeImgType(files[0].file.type)) {
      Toast.info("上传图片格式仅支持jpg，jpeg，png格式", 2);
      return;
    }
    var that = this;
    this.upimg(files).then(data => {
      that.setState({
        // imgurl3:files[0].url,
        imgurl3: data.data,
        upimg3: data.data
      });
    });
  },
  judgeImgType(file) {
    var array = file.split("/");
    var index = array.length - 1;
    if (
      array[index] == "jpg" ||
      array[index] == "png" ||
      array[index] == "jpeg" ||
      array[index] == "JPG" ||
      array[index] == "JPEG" ||
      array[index] == "PNG"
    ) {
      return true;
    } else {
      return false;
    }
  },
  handelImg(image, imgurl) {
    var that = this;
    //此处进行图片旋转的判断处理
    var width = image.width;
    var height = image.height;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var newImage = new Image();
    EXIF.getData(image, function() {
      var orientation = EXIF.getTag(this, "Orientation");
      switch (orientation) {
        //正常状态
        case 1:
          alert("旋转0°");
          // canvas.height = height;
          // canvas.width = width;
          newImage = image;
          break;
        //旋转90度
        case 6:
          alert("旋转90°");
          canvas.height = width;
          canvas.width = height;
          ctx.rotate(Math.PI / 2);
          ctx.translate(0, -height);
          ctx.drawImage(image, 0, 0);
          imageDate = canvas.toDataURL("Image/jpeg", 1);
          newImage.src = imageDate;
          break;
        //旋转180°
        case 3:
          console.log("旋转180°");
          alert("旋转180°");
          canvas.height = height;
          canvas.width = width;
          ctx.rotate(Math.PI);
          ctx.translate(-width, -height);
          ctx.drawImage(image, 0, 0);
          imageDate = canvas.toDataURL("Image/jpeg", 1);
          newImage.src = imageDate;
          break;
        //旋转270°
        case 8:
          console.log("旋转270°");
          alert("旋转270°");
          canvas.height = width;
          canvas.width = height;
          ctx.rotate(-Math.PI / 2);
          ctx.translate(-height, 0);

          ctx.drawImage(image, 0, 0);
          imageDate = canvas.toDataURL("Image/jpeg", 1);
          newImage.src = imageDate;
          break;
        //undefined时不旋转
        case undefined:
          console.log("undefined  不旋转");
          alert("undefined  不旋转");
          newImage = image;
          break;
      }
    });
    // alert(newImage.src);
    switch (imgurl) {
      case 1:
        that.setState({
          imgurl: newImage.src
        });
        break;
      case 2:
        that.setState({
          imgurl2: newImage.src
        });
        break;
      case 3:
        that.setState({
          imgurl3: newImage.src
        });
        break;
      default:
        break;
    }

    // return newImage;
  },
  onClose() {
    this.setState({
      modal1: false
    });
  },
  render() {
    const { files } = this.state;
    var showbox = this.props.page == 1 ? "" : "none";
    return (
      <div className="step_1" style={{ display: showbox }}>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose}
          title="提示"
          className="imgInfo"
        >
          <div>
            <img src="images/images/loading.gif" alt="" />
            <p>图片正在上传中...</p>
          </div>
        </Modal>
        <div className="title">
          <img src="images/images/title_2.jpg" />
        </div>
        <div className="con">
          <div className="tip">
            {/* <i
                            style={{background:"url(images/images/icon_05.png)",backgroundSize:"100%"}}
                        ></i> */}
            <img src="images/images/icon_05.png" />
            基本信息
          </div>
          <div className="price">
            <div className="top">
              <span>姓名</span>
              <InputItem
                style={{ height: "0.52rem", fontSize: "0.28rem" }}
                value={this.state.name}
                onChange={e => {
                  this.setState({
                    name: e
                  });
                }}
                placeholder="请输入个人姓名"
              />
            </div>
            <div className="top">
              <span>手机号</span>
              <InputItem
                value={this.state.phone}
                style={{ height: "0.52rem", fontSize: "0.28rem" }}
                placeholder="请输入个人手机号"
              />
            </div>
            <div className="top">
              <span>邮箱</span>
              <InputItem
                value={this.state.email}
                onChange={e => {
                  this.setState({
                    email: e
                  });
                }}
                style={{ height: "0.52rem", fontSize: "0.28rem" }}
                placeholder="请输入邮箱"
              />
            </div>
          </div>
          <div className="tip_2">
            <img src="images/images/icon_05.png" />
            上传身份证照片
          </div>
          {/* <div>{this.state.upimg1}</div> */}
          <div className="price">
            <div className="top">
              <span>身份证号码</span>
              <InputItem
                value={this.state.idcard}
                onChange={e => {
                  this.setState({
                    idcard: e
                  });
                }}
                style={{
                  height: "0.52rem",
                  fontSize: "0.28rem",
                  width: "3.8rem"
                }}
                placeholder="请输入身份证号码"
              />
            </div>
            <div className="top" style={{ borderBottom: "none" }}>
              <span style={{ width: "100%" }}>上传身份证照片</span>
            </div>
            <div className="uplist">
              <div style={{ position: "relative" }}>
                <img src={this.state.imgurl} />
                <p>身份证正面</p>
                <ImagePicker
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "6rem",
                    height: "5rem",
                    opacity: "0"
                  }}
                  files={files}
                  onChange={this.onChange}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={files.length < 2}
                />
              </div>
              <div style={{ position: "relative" }}>
                <img src={this.state.imgurl2} />
                <p>身份证反面</p>
                <ImagePicker
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "6rem",
                    height: "5rem",
                    opacity: "0"
                  }}
                  files={files}
                  onChange={this.onChange2}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={files.length < 1}
                />
              </div>
              <div style={{ position: "relative" }}>
                <img src={this.state.imgurl3} />
                <p>手持身份证</p>
                <ImagePicker
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "6rem",
                    height: "5rem",
                    opacity: "0"
                  }}
                  files={files}
                  onChange={this.onChange3}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={files.length < 1}
                />
              </div>
            </div>
          </div>
          <div className="next">
            <input type="button" value="下一步" onClick={this.btn} />
          </div>
        </div>
      </div>
    );
  }
});
var mapStateToProps = state => {
  return {
    step1: state.step1
  };
};

export default connect(mapStateToProps)(Home);
