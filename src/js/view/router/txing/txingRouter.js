import "./style.less";
import Top from "../../components/public/title";
import Add from "../../components/txing/txingcontent"
import Footer from "../../components/public/footer_3";
export default React.createClass({
    
    getInitialState(){
        return {
            title:"审核中"
        }
    },
    componentWillMount(){
        if(this.props.location.query.state=="21"||this.props.location.query.state=="32"){
            this.setState({
                title:"已结束"
            })
        }else if(this.props.location.query.state=="41"){
            this.setState({
                title:"放款中"
            })
        }
    },
    render:function(){
        return (
            <div className="txing">
             <Top back="true" title={this.state.title}/>
             <Add qu={this.props.location.query} />
             <Footer />
            </div>
        )
    }
})