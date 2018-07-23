// import Top from "../"
import "./coupon.less";
import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3.2";
import Con from "../../components/coupon/couponcontent";
export default React.createClass({
    render:function(){
        return (
            <div className="coupon">
                <Top title="优惠券" back="true" tip="true"/>
                <Con />
                <Footer />
           </div>
        )
    }
})