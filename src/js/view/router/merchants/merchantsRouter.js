import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3";
import Banner from "../../components/home/homebanner";
import "./style.less";
import Topcontent from "../../components/merchants/metop";
import Operating from "../../components/merchants/operating"
export default React.createClass({
    render:function(){
        return (
            <div className="merchants">
                <Top title="商品名" back={true} show={true}/>
                <Footer />
                <div className="content_box">
                    <Banner />
                    <Topcontent />
                    <Operating />
                </div>
            </div>
        )
    }
})