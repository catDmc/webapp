import "./style.less";
import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3.2";


import Content from "../../components/batchrepayment/content";
export default React.createClass({
    getInitialState(){
        return {
            // id:""
        }
    },
    componentWillMount(){
        this.setState(this.props.location.query)
    },
    render:function(){
        return (
            <div className="already">
                 <Top title="批量还款" back={true} />

                     <Content id={this.state}/>

                 <Footer />   
            </div>
        )
    }
})