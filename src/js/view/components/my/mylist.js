import { Link, hashHistory, browserHistory } from "react-router";
import { Modal, Button, WhiteSpace, WingBlank, Toast } from "antd-mobile";
import url from "../../config/config";
import store from "../../../store/store";
import fetch1 from "fetch-polyfill2";
const Out = React.createClass({
  getInitialState() {
    return {
      liked: true
    };
  },
  componentWillMount() {
    if (!sessionStorage.show) {
      this.setState({
        liked: false
      });
    }
  },
  componentDidMount() {
    // alert(1)
  },
  render() {
    return (
      <div className="dropout">
        <div className="dropout_left" />
        <div className="dropout_right">
          <span>退出</span>
        </div>
      </div>
    );
  }
});

const List = React.createClass({
  getInitialState() {
    return {};
  },
  componentWillMount() {
    // alert(1)
    console.log(store.getState());
  },
  render() {
    return (
      <div className="operationlist">
        <Link to={this.props.info.path}>
          <div className="op_left">
            <img src={this.props.info.img} />
          </div>
          <div className="op_right">
            <span>{this.props.info.title}</span>
          </div>
          <div className="op_d">
            <img src="images/images/daikuan_08.gif" />
          </div>
        </Link>
      </div>
    );
  }
});

export default React.createClass({
  getInitialState() {
    return { liked: true };
  },
  btn() {
    localStorage.clear();
    sessionStorage.clear();
    hashHistory.push("home");
  },
  handleClickk: function(event) {
    this.setState({ liked: !this.state.liked });
  },
  componentWillMount() {
    var that = this;
    var data = new FormData();
    data.append("userId", localStorage.userId);
    fetch1(url.url + "/api/act/mine/userInfo/getMyMessage.htm", {
      headers: {
        token: localStorage.Token
      },
      method: "POST",
      body: data
    })
      .then(r => r.json())
      .then(data => {
        switch (data.code) {
          case 413:
            Toast.info("您已退出,请重新登录", 1);
            localStorage.clear();
            sessionStorage.clear();
            hashHistory.push("home");
            break;
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
            Toast.info("服务器错误,请重新登录", 1);
            localStorage.clear();
            sessionStorage.clear();
            hashHistory.push("home");
            break;
          case 160001:
            Toast.info("获取信息超时，请稍后再次尝试", 1);
            break;
          case 160002:
            Toast.info("获取信息失败，请稍后再次尝试", 1);
            break;
          default:
            break;
        }
        that.setState(data.data);
      })
      .catch(function(e) {
        console.log("Oops, error");
        // Toast.info("服务器响应超时", 2);
      });
  },
  btn1() {
    // console.log(1);
    if (this.state.userInfo == "未完善") {
      hashHistory.push("information");
    } else if (
      this.state.userInfo == "未认证" ||
      this.state.userInfo == "已认证" ||
      this.state.userInfo == "认证过期" ||
      this.state.userInfo == "认证失败"
    ) {
      hashHistory.push("perfect");
    }
  },
  render() {
    var texts = this.state.liked ? "none" : "block";
    const info = this.props.info.map((con, index) => {
      return <List key={index} info={con} />;
    });
    return (
      <div className="infolist">
        <div
          className="infobg"
          style={{
            background: "url(images/images/my_02.gif)",
            backgroundSize: "100%"
          }}
        >
          <div className="amount_">
            <p className="amount_y">{this.state.unuse}元</p>
            <p className="amount_x">剩余授信额度</p>
          </div>
          <div className="amoun_t">
            <div className="z_amount">
              <p>总授信额度</p>
              <p className="x_amount">{this.state.total}元</p>
            </div>
            <div className="y_amount">
              <p>已使用额度</p>
              <p className="x2_amount">{this.state.used}元</p>
            </div>
          </div>
        </div>
        <div className="info_box">
          <div className="operationlist">
            <Link onClick={this.btn1}>
              <div className="op_left">
                <img src="images/images/my_03 (1).gif" />
              </div>
              <div className="op_right" style={{ position: "relative" }}>
                <span>个人信息</span>
                <span
                  style={{
                    position: "absolute",
                    width: "1.5rem",
                    fontSize: "0.26rem",
                    color: "#f99b47",
                    left: "3rem"
                  }}
                >
                  {this.state.userInfo == "已认证" ||
                  this.state.userInfo == "认证过期"
                    ? "已认证"
                    : "未认证"}
                </span>
              </div>

              <div className="op_d">
                <img src="images/images/daikuan_08.gif" />
              </div>
            </Link>
          </div>
          <div className="operationlist">
            <Link to="loan">
              <div className="op_left">
                <img src="images/images/my_03 (2).gif" />
              </div>
              <div className="op_right">
                <span>借款信息</span>
              </div>
              <div className="op_d">
                <img src="images/images/daikuan_08.gif" />
              </div>
            </Link>
          </div>
          <div className="operationlist">
            <Link to="coupon">
              <div className="op_left">
                <img src="images/images/my_03 (3).gif" />
              </div>
              <div className="op_right">
                <span>优惠券</span>
              </div>
              <div className="op_d">
                <img src="images/images/daikuan_08.gif" />
              </div>
            </Link>
          </div>
          <div className="operationlist">
            <Link to="about">
              <div className="op_left">
                <img src="images/images/my_03 (4).gif" />
              </div>
              <div className="op_right">
                <span>关于我们</span>
              </div>
              <div className="op_d">
                <img src="images/images/daikuan_08.gif" />
              </div>
            </Link>
          </div>
          <div className="operationlist">
            <Link to="qr">
              <div className="op_left">
                <img src="images/images/my_03 (3).gif" />
              </div>
              <div className="op_right" style={{ position: "relative" }}>
                <span>邀请码</span>
                <span
                  style={{
                    fontSize: "0.26rem",
                    color: "#f99b47",
                    position: "absolute",
                    left: "3rem"
                  }}
                >
                  {this.state.invitationCode}
                </span>
              </div>

              <div className="op_d">
                <img src="images/images/daikuan_08.gif" />
              </div>
            </Link>
          </div>
          {/* <div className="operationlist">
                <Link onClick={this.btn}>
                    <div className="op_left">
                      <img src="images/images/my_03 (5).gif" />
                    </div>
                    <div className="op_right">
                        <span>退出</span>

                    </div>
                 <div className="op_d"><img src="images/images/daikuan_08.gif" /></div>
                </Link>
            </div> */}
        </div>
        <Link onClick={this.handleClickk}>
          <div
            style={{
              width: "90%",
              height: "1rem",
              background: "#f99b47",
              margin: "auto",
              marginTop: "0.4rem",
              borderRadius: "0.1rem",
              textAlign: "center",
              lineHeight: "1rem",
              color: "#fff",
              fontSize: "0.32rem",
              cursor: "pointer"
            }}
          >
            退出
          </div>
        </Link>
        <div className="tx_tc" style={{ display: texts }}>
          <div className="tx_tc1">
            <div className="tx_tca">
              <div className="tx_tcaa">确认退出吗？</div>
            </div>
            <div className="tx_tcb">
              <Link className="tx_tcc" onClick={this.btn}>
                确认
              </Link>
              <div onClick={this.handleClickk} className="tx_tcd">
                取消
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
