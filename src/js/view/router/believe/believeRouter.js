import "./believe.less";
import Con from "../../components/believe/believecontent";
import Footer from "../../components/public/footer_3";
import Top from "../../components/public/title";
export default React.createClass({
    render(){
        return (
            <div>
             <Top back={true} title="授信协议"/>
             <Con />
             <Footer />
            </div>
        )
    }
})