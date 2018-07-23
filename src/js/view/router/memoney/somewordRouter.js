import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3";
import Banner from "../../components/home/homebanner";
import "./style.less";
import Some from "../../components/memoney/someword";
export default React.createClass({
    render:function(){
        return (
            <div className="merchants">
                <Top title="我要赚钱" back={true}/>
                <Footer home="true"/>
                <div className="content_box">
                   
                    <Some />
                    
                </div>
            </div>
        )
    }
})