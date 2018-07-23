import "./style.less";
import Gvrp from "../../components/gvrp/gvrpcontant";
import Footer from "../../components/public/footer_3";
import Top from "../../components/public/title";
export default React.createClass({
    render(){
        return (
            <div>
             <Top back={true} title="注册协议"/>
             <Gvrp />
             <Footer />
            </div>
        )
    }
})