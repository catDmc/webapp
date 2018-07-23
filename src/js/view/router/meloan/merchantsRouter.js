import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3";
import Banner from "../../components/home/homebanner";
import "./style.less";
import List from "../../components/meloan/metop";
import Operating from "../../components/meloan/operating"
export default React.createClass({
    getDefaultProps(){
        return {
            list:[
            // {
            //     title:"超人贷",
            //     content:"一键管理您的信用卡",
            //     img:"images/images/daikuan_14.gif",
            //     path:"coupon"
            // },
            {
                title:"其他",
                content:"为您定制专属的贷款方案",
                img:"images/images/daikuan_16.gif",
                path:"loanlist"
            },
        ]
        }
    },
    render:function(){
        return (
            <div className="merchants">
                <Top title="我要贷款" back={true}/>
                <div className="wyzqcimg">
                  <img src="images/images/wyzk_02.gif" />
                </div>
                <Footer  home="true"/>
                <List info={this.props.list} />
            </div>
        )
    }
})