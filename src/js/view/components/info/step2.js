import {
  InputItem,
  ImagePicker,
  Toast,
  Picker,
  List,
  Modal
} from "antd-mobile";
import url from "../../config/config";
import { compress } from "../../../utils/imgCompress";
import bank from "../method/bank";
import fetch1 from "fetch-polyfill2";
import { connect } from "react-redux";
var Home = React.createClass({
  getInitialState() {
    return {
      files: [],
      bankcard: "",
      imgurl: "images/images/icon_09.jpg",
      imgurl2: "images/images/icon_10.jpg",
      imgup1: "",
      imgup2: "",
      value: [""], //银行名称
      pwd: "",
      tip: "发送验证码",
      oldcard: "",
      showpwd: false, //是否显示发送验证码
      dbclick: true //不能多次点击发送验证码
    };
  },

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: "STEP2",
      data: this.state
    });
    clearInterval(this.timer);
  },
  componentWillMount() {
    const { step2 } = this.props;
    if (step2.imgurl) {
      this.setState(step2);
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
            value: [data.data.bank],
            bankcard: data.data.cardNo,
            imgurl: data.data.frontImg
              ? data.data.frontImg
              : "images/images/icon_09.jpg",
            imgurl2: data.data.backImg
              ? data.data.backImg
              : "images/images/icon_10.jpg",
            imgup1: data.data.frontImg,
            imgup2: data.data.backImg,
            oldcard: data.data.cardNo
          });
        }
      });
    }
    this.setState({ modal1: false, tip: "发送验证码", dbclick: true }); //每次进来确保加载框不出来
    var that = this;
    fetch(url.url + "/api/act/mine/bank/list.htm", {
      headers: {
        token: localStorage.Token
      },
      method: "get"
    })
      .then(r => r.json())
      .then(data => {
        if (data.code == "410") {
          Toast.info("您的账号已在其他设备登录", 2);
          setTimeout(function() {
            hashHistory.push("login");
          }, 2000);
        } else if (data.code == "411") {
          Toast.info("登录已失效,请重新登录", 2);
          setTimeout(function() {
            hashHistory.push("login");
          }, 2000);
        } else if (data.code == "408") {
          Toast.info("系统响应超时", 2);
        } else if (data.code == "500") {
          Toast.info("系统错误", 2);
        } else {
          var newlist = data.data.map(con => {
            return {
              label: con.bankName,
              value: con.bankName
            };
          });
          that.setState({
            banklist: newlist,
            creditcardlist: data.data
          });
        }
      })
      .catch(function(e) {
        console.log("Oops, error");
        Toast.info("服务器响应超时", 2);
      });
  },
  btn() {
    if (!this.state.value[0]) {
      Toast.info("请选择银行", 2);
    } else if (!this.state.bankcard) {
      Toast.info("请填写银行卡号", 2);
    } else if (!bank(this.state.bankcard)) {
      Toast.info("请填写正确的银行卡号", 2);
    } else if (this.state.oldcard != this.state.bankcard && !this.state.pwd) {
      Toast.info("请填写验证码", 2);
    } else if (!this.state.imgup1) {
      Toast.info("请上传银行卡正面", 2);
    } else if (!this.state.imgup2) {
      Toast.info("请上传银行卡背面", 2);
    } else {
      var that = this; //保存银行卡信用卡接口
      var data = new FormData();
      data.append("backImg", this.state.imgup2);
      data.append("bank", this.state.value[0]);
      data.append("cardNo", this.state.bankcard + "," + this.state.pwd);
      data.append("frontImg", this.state.imgup1);
      data.append("userId", localStorage.userId);
      // data.append("validatecode",this.state.pwd);

      fetch(url.url + "/api/act/mine/bank/saveBank.htm", {
        headers: {
          token: localStorage.Token
        },
        method: "POST",
        body: data
      })
        .then(r => r.json())
        .then(data => {
          if (data.code == "200") {
            that.setState({
              oldcard: that.state.bankcard,
              showpwd: false
            });
            that.props.step(4);
          } else if (data.code == "400") {
            Toast.info(data.msg, 2);
          }
        })
        .catch(function(e) {
          console.log("Oops, error");
          Toast.info("服务器响应超时", 2);
        });
    }
  },
  upimg(files) {
    var that = this;
    return new Promise(function(suc, err) {
      var data = new FormData();
      that.setState({ modal1: true }, () => {
        data.append("img", files[0].url);
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
            console.log("Oops, error");
            Toast.info("服务器响应超时", 2);
            that.setState({ modal1: false });
          });
      });
    });
  },
  onChange(files, type, index) {
    var that = this;
    if (!this.judgeImgType(files[0].file.type)) {
      Toast.info("上传图片格式仅支持jpg，jpeg，png格式", 2);
      return;
    }
    this.upimg(files).then(data => {
      that.setState({
        // imgurl:files[0].url,
        imgurl: data.data,
        imgup1: data.data
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
        imgurl2: data.data,
        imgup2: data.data
      });
    });
  },
  send() {
    var that = this;
    if (this.state.dbclick) {
      if (this.state.tip == "发送验证码") {
        if (!this.state.bankcard) {
          Toast.info("请填写银行卡号", 2);
        } else if (!bank(this.state.bankcard)) {
          Toast.info("请填写正确的银行卡号", 2);
        } else {
          this.setState({
            dbclick: false
          });
          var data = new FormData();
          data.append("userId", localStorage.userId);
          data.append("cardNo", this.state.bankcard);
          data.append("phone", localStorage.Phone);

          fetch1(url.url + "/api/act/mine/bank/authBindCardReq.htm", {
            headers: {
              token: localStorage.Token
            },
            method: "POST",
            body: data
          })
            .then(r => r.json())
            .then(data => {
              if (data.code == "200") {
                that.setState({
                  dbclick: false
                });
                Toast.info("短信发送成功", 2);
                var i = 120;
                that.timer = setInterval(function() {
                  i--;
                  that.setState({
                    tip: i + "秒后再发送"
                  });
                  if (i == 0) {
                    clearInterval(that.timer);
                    that.setState({
                      tip: "发送验证码",
                      dbclick: true
                    });
                  }
                }, 1000);
              } else {
                Toast.info(data.msg, 2);
                that.setState({
                  dbclick: true
                });
              }
            });
        }
      }
    }
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
  onClose() {
    this.setState({
      modal1: false
    });
  },
  render() {
    const { files } = this.state;
    var showbox = this.props.page == 2 ? "" : "none";
    return (
      <div className="step_2" style={{ display: showbox }}>
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
          <img src="images/images/title.jpg" />
        </div>
        <div className="con">
          <div className="tip">
            <img src="images/images/icon_05.png" />
            银行卡信息
          </div>
          <div className="wrap">
            <div className="price">
              <div className="top">
                <span>银行名称</span>
                <Picker
                  extra="请选择银行"
                  data={this.state.banklist}
                  cols="1"
                  value={this.state.value}
                  onOk={e => {
                    this.setState({ value: e });
                  }}
                  onDismiss={e => console.log("dismiss", e)}
                >
                  <List.Item style={{ width: "4rem" }} />
                </Picker>
              </div>
              <div className="top">
                <span>银行卡号</span>
                <InputItem
                  style={{ color: "#888" }}
                  value={this.state.bankcard}
                  onChange={e => {
                    if (e != this.state.oldcard) {
                      this.setState({
                        showpwd: true
                      });
                    } else {
                      this.setState({
                        showpwd: false
                      });
                    }
                    this.setState({
                      bankcard: e
                      // showpwd:true
                    });
                  }}
                  style={{
                    height: "0.52rem",
                    fontSize: "0.28rem",
                    width: "4rem"
                  }}
                  placeholder="请输入银行卡号"
                />
              </div>
              <div
                className="top"
                style={{
                  borderTop: "1px solid #f89c47",
                  display: this.state.showpwd ? "" : "none"
                }}
              >
                <span>验证码</span>
                <input
                  style={{
                    color: "#555",
                    height: "0.52rem",
                    fontSize: "0.28rem",
                    width: "2rem",
                    marginLeft: "0.3rem",
                    border: "0"
                  }}
                  placeholder="请输入验证码"
                  value={this.state.pwd}
                  onChange={e => {
                    this.setState({
                      pwd: e.target.value
                    });
                  }}
                />
                <span
                  onClick={this.send}
                  style={{
                    color: this.state.tip == "发送验证码" ? "#fa9b47" : "#555",
                    height: "0.72rem",
                    lineHeight: "0.72rem",
                    width: "2.3rem",
                    textAlign: "center"
                  }}
                >
                  {this.state.tip}
                </span>
              </div>
              <div className="upimg">上传银行卡照片</div>
              <div className="img_box">
                <div className="left">
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img src={this.state.imgurl} />
                    <ImagePicker
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "16rem",
                        height: "15rem",
                        opacity: "0"
                      }}
                      files={files}
                      onChange={this.onChange}
                      onImageClick={(index, fs) => console.log(index, fs)}
                      selectable={files.length < 1}
                    />
                  </div>

                  <p>银行卡正面</p>
                </div>
                <div className="right">
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img src={this.state.imgurl2} />
                    <ImagePicker
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "16rem",
                        height: "15rem",
                        opacity: "0"
                      }}
                      files={files}
                      onChange={this.onChange2}
                      onImageClick={(index, fs) => console.log(index, fs)}
                      selectable={files.length < 1}
                    />
                  </div>

                  <p>银行卡背面</p>
                </div>
              </div>
            </div>
          </div>

          <div className="step">
            <button
              onClick={() => {
                this.props.step(1);
              }}
            >
              上一步
            </button>{" "}
            <button onClick={this.btn}>下一步</button>
          </div>
        </div>
      </div>
    );
  }
});
var mapStateToProps = state => {
  return {
    step2: state.step2
  };
};

export default connect(mapStateToProps)(Home);
