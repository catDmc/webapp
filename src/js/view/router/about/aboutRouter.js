// import Top from "../"
import "./about.less";
import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3.2";
import Con from "../../components/about/aboutcontent";
export default React.createClass({
  
    
    render:function(){
        return (
            <div className="about">
                <Top title="关于我们" back="true"/>
                <Con ref="nu"/>
                <Footer />
           </div>
        )
    }
})