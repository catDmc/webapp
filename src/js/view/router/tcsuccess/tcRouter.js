import "./tc.less";
import Top from "../../components/public/title";
import Set from "../../components/set/setcontant";
import Add from "../../components/tcsuccess/tccontent";
import Footer from "../../components/public/footer_3";
export default React.createClass({
    render:function(){
        return (
            <div>
             <Top back="true" title="提交成功"/>
             <Add />
             <Footer />
            </div>
        )
    }
})