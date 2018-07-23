import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3";
import {Link} from "react-router";
import url from "../../config/config";
import "./style.less";
export default React.createClass({
    render:function(){
        return (
            <div className="qr">
                <Top title="借款协议" back="true"/>
                <iframe src={url.url+"/h5/protocol_borrow.jsp"} frameborder="0" className="iframe"></iframe>
                <Footer />
            </div>
            
        )
    }
})