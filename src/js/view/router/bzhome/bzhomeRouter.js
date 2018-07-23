import Footer from "../../components/public/footer_3";
import Top from "../../components/public/title";
import Banne from "../../components/bzhome/bzbanner";
import Content from "../../components/bzhome/bzcontent";

import "./style.less";
export default React.createClass({
    render(){
        return (
            <div>
             <Top back={true} title="首页"/>
             <Banne />
             
             <Content />
             <Footer />
            </div>
        )
    }
})