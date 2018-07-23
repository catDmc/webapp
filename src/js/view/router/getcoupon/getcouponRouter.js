
import "./style.less";
import Dev from "../../components/getcoupon/getcouponcontent";
import Footer from "../../components/public/footer_3";
import Top from "../../components/public/title";
export default React.createClass({
    getInitialState(){
        return {
            id:""
        }
    },
    componentWillMount(){
        this.setState({
            id:this.props.location.query.couponid
        })
        
    },
    render(){
        return (
            <div>
             <Top back={true} title="获得优惠券"/>
             <Dev couponid={this.state.id}/>
             <Footer />
            </div>
        )
    }
})