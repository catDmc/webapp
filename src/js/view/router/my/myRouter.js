import Footer from "../../components/public/footer_3.2";
import Top from "../../components/public/title";
import List from "../../components/my/mylist";
import "./style.less";
export default React.createClass({
    getDefaultProps(){
        return {
            list:[{
                title:"个人信息",
                path:"information",
                img:"images/images/my_03 (1).gif"
            },
            {
                title:"借款信息",
                path:"loan",
                img:"images/images/my_03 (2).gif"
            },
            {
                title:"优惠券",
                path:"coupon",
                img:"images/images/my_03 (3).gif"
            },
            {
                title:"关于我们",
                path:"about",
                img:"images/images/my_03 (4).gif"
            },
        ]
        }
    },
    componentDidMount(){
        
    },
    render:function(){
        return (
            <div className="myrouter">
                <Top title="我的"/>
                
                <List info={this.props.list} />
               
                <Footer />
            </div>
            
        )
    }
})