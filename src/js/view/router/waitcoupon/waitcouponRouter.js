import "./wait.less";
import Dev from "../../components/waitcoupon/waitcouponcontent";
import Footer from "../../components/public/footer_3";
import Top from "../../components/public/title";
export default React.createClass({
    render(){
        return (
            <div>
             <Top back={true} title="授信申请提交成功"/>
             <Dev />
             <Footer />
            </div>
        )
    }
})