import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3";
import "./style.less";
import Body from "../../components/repayment/content";
export default React.createClass({
    getInitialState(){
        return {

        }
    },
    componentWillMount(){
        this.setState(this.props.location.query);
        // console.log(this.props.location.query);
    },
    render:function(){
        return (
            <div className="repayment">
                <Top title="还款" back={true} />
                <div className="re_content">
                    <Body orderNo={this.state.orderNo}/>
                </div>
                <Footer />
            </div>
        )
    }
})