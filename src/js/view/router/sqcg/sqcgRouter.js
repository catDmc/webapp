import "./style.less";
import Top from "../../components/public/title";
import Add from "../../components/sqcg/sqcgcontent";
import Footer from "../../components/public/footer_3";
export default React.createClass({
    render:function(){
        return (
            <div>
             <Top back="true" title="申请提交成功"/>
            <Add />
             <Footer />
            </div>
        )
    }
})