import "./style.less";
import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3.2";


import Content from "../../components/already/content"
export default React.createClass({
    getInitialState(){
        return {
            orderId:""
        }
    },
    componentWillMount(){
        console.log(this.props.location.query);
        this.setState(this.props.location.query)
    },
    render:function(){
        return (
            <div className="already">
                 <Top title="已结束" back={true} />

                     <Content id={this.state.orderId}/>

                 <Footer />   
            </div>
        )
    }
})