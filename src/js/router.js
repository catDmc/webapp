import {Router,Route,hashHistory,IndexRedirect,browserHistory,IndexRoute,withRouter,Switch} from "react-router";
import Rou from "./view/router/router";//跟路由
import Home from "./view/router/home/homeRouter";//首页
import My from "./view/router/my/myRouter";//我的
import Login from "./view/router/login/loginRouter";//登录
import Merchants from "./view/router/merchants/merchantsRouter";//商户名
import Qr from "./view/router/qr/qrcodeRouter";//二维码
import Information from "./view/router/information/informationRouter";//完善个人信息
import Perfect from "./view/router/prefect/perfectRouter";//已完善个人信息
import Loan from "./view/router/loan/loanRouter";//借款信息
import Repayment from "./view/router/repayment/repaymentRouter";//还款
import Already from "./view/router/already/alreadyrepayRouter";//已还款
import About from "./view/router/about/aboutRouter";//关于我们
import Card from "./view/router/creditcard/creditcard";//信用卡代还
import Withdraw from "./view/router/withdraw/withdrawRouter";//立即提现
import Coupon from "./view/router/coupon/couponRouter";//优惠券
import Usecoupon from "./view/router/usecoupon/usecouponRouter";//如何使用优惠券
import Meloan from "./view/router/meloan/merchantsRouter";//我要贷款
import Memoney from "./view/router/memoney/somewordRouter";//我要赚钱
import Gvrp from "./view/router/gvrp/gvrpRouter";//注册协议
import Getcoupon from "./view/router/getcoupon/getcouponRouter";//获得优惠券
import Waitcoupon from "./view/router/waitcoupon/waitcouponRouter";//申请授信提交成功
import Believe from "./view/router/believe/believeRouter";//授信协议
import Tcsuccess from "./view/router/tcsuccess/tcRouter";//提交成功
import Txing from "./view/router/txing/txingRouter";//审核中
import Bzhome from "./view/router/bzhome/bzhomeRouter";//保赚首页
import Loginsuccess from "./view/router/loginsuccess/loginsuccessRouter";//登录成功
import Loanlist from "./view/router/loanlist/loanlist";//我要贷款信息列表
import Makemoney from "./view/router/makemoneylist/makemoneylist";//我要赚钱信息列表
import Sqcg from "./view/router/sqcg/sqcgRouter";//申请成功
import Sqsb from "./view/router/sqsb/sqsbRouter";//授信失败
import Pmh from "./view/router/pmh/pmhRouter";//信用卡还款
import Ddd from "./view/router/ddd/dd";
import Borrow from "./view/router/protocol/borrow";//借款协议
import Auth from "./view/router/protocol/auth";//授信协议
import Reg from "./view/router/protocol/reg";//注册协议
import Batchrepayment from "./view/router/batch-repayment/batch-repaymentRouter";//批量还款
import { Provider, connect } from "react-redux";
import store from "./store/store";
import 'babel-polyfill';//解决部分手机对es6object.assign的支持
export default React.createClass({
    enterMy(){
        window.scrollTo(0,0);
    },
    render:function(){
        return (
            <Provider store={store}>
            <Router history={hashHistory}>
            {/* <withRouter> */}
                <Route path="/" component={Rou} onEnter={this.enterMy}>
                     <withRouter>
                
                    <IndexRedirect to="home"/>                   
                    <Route path="home" component={Home} onEnter={this.enterMy}/>
                    <Route path="my" component={My} onEnter={this.enterMy} />
                    <Route path="login" component={Login} onEnter={this.enterMy}/>
                    <Route path="merchants" component={Merchants} onEnter={this.enterMy}/>
                    <Route path="qr" component={Qr} onEnter={this.enterMy}/>
                    <Route path="information" component={Information} onEnter={this.enterMy}/>
                    <Route path="perfect" component={Perfect} onEnter={this.enterMy}/>
                    <Route path="loan" component={Loan} onEnter={this.enterMy}/>
                    <Route path="repayment" component={Repayment} onEnter={this.enterMy}/>
                    <Route path="already" component={Already} onEnter={this.enterMy}/>
                    <Route path="about" component={About} onEnter={this.enterMy}/>
                    <Route path="withdraw" component={Withdraw} onEnter={this.enterMy}/>
               		<Route path="coupon" component={Coupon} onEnter={this.enterMy}/>
                    <Route path="meloan" component={Meloan} onEnter={this.enterMy}/>
                    <Route path="memoney" component={Memoney} onEnter={this.enterMy}/>
                    <Route path="gvrp" component={Gvrp} onEnter={this.enterMy}/>
                    <Route path="getcoupon" component={Getcoupon} onEnter={this.enterMy}/>
                    <Route path="waitcoupon" component={Waitcoupon} onEnter={this.enterMy}/>
                    <Route path="believe" component={Believe} onEnter={this.enterMy}/>
                    <Route path="tcsuccess" component={Tcsuccess} onEnter={this.enterMy}/>
                    <Route path="txing" component={Txing} onEnter={this.enterMy}/>
                    <Route path="bzhome" component={Bzhome} onEnter={this.enterMy}/>
                    <Route path="loginsuccess" component={Loginsuccess} onEnter={this.enterMy}/>
                    <Route path="card" component={Card} onEnter={this.enterMy}/>
                    <Route path="loanlist" component={Loanlist} onEnter={this.enterMy}/>
                    <Route path="makemoney" component={Makemoney} onEnter={this.enterMy}/>
                    <Route path="sqcg" component={Sqcg} onEnter={this.enterMy}/>
                    <Route path="sqsb" component={Sqsb} onEnter={this.enterMy}/>
                    <Route path="pmh" component={Pmh} onEnter={this.enterMy}/>
                    <Route path="sqsb" component={Sqsb} onEnter={this.enterMy}/>
                    <Route path="pmh" component={Pmh} onEnter={this.enterMy}/>
                    <Route path="loanlist" component={Loanlist} onEnter={this.enterMy}/>
                    <Route path="makemoney" component={Makemoney} onEnter={this.enterMy}/>                   
                    <Route path="ddd" component={Ddd} onEnter={this.enterMy}/>
                    <Route path="usecoupon" component={Usecoupon} onEnter={this.enterMy}/> 
                    <Route path="borrow" component={Borrow} onEnter={this.enterMy}/> 
                    <Route path="auth" component={Auth} onEnter={this.enterMy}/>
                    <Route path="reg" component={Reg} onEnter={this.enterMy}/>
                    <Route path="batchrepayment" component={Batchrepayment} onEnter={this.enterMy}/> 
                    </withRouter>                        
                </Route>
                
            </Router>
            </Provider>
        )
    }
})