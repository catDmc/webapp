import "./style.less";
import Top from "../../components/public/title";
import Add from "../../components/usecoupon/usecouponcontent"
import Footer from "../../components/public/footer_3";
export default React.createClass({
    
    // componentWillMount(){
    //     console.log(this.props.location.query)
    // },
    render:function(){
        return (
            <div className="txing">
             <Top back="true" title="如何使用优惠券"/>
             <Add />
             <Footer />
            </div>
        )
    }
})