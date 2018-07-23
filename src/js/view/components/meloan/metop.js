import {Link} from "react-router";

const List=React.createClass({
    render(){
        return (
            <div className="wyzqlist">
            
                <Link to={this.props.info.path} className="zq_father">
                    <div className="zq_left">
                      <img  src={this.props.info.img} />
                    </div>
                    <div className="zq_right">
                        <p className="wyzqw1">{this.props.info.title}</p>
                        <p className="wyzqw2">{this.props.info.content}</p>
                    </div>
                    <div className="zq_d"><img src="images/images/daikuan_08.gif" /></div>
                </Link>
                
            </div>
        )
    }
})


export default React.createClass({
    componentDidMount(){
        // console.log(this.props.info);
    },
    render(){
        const info=this.props.info.map((con,index)=>{
            return <List key={index} info={con} />
        })
        return (
           <div className="wyzqcnm">            
                <div className="wyzqflist">                    
                    <div className="wyzq_box">
                        <div className="wyzqlist">                
                    <a href="https://qcrapp.chainfin.com/oauth/walletOauthApp/activeLogin.html?recommendNum=13343440123" className="zq_father">
                        <div className="zq_left">
                        <img  src="images/images/daikuan_14.gif"/>
                        </div>
                        <div className="zq_right">
                            <p className="wyzqw1" style={{paddingLeft: "0.6rem"}}>超人贷</p>
                            <p className="wyzqw2" style={{paddingLeft: "0.6rem"}}>最高30万借款额度等你来拿</p>                        
                        </div>
                        <div className="zq_d"><img src="images/images/daikuan_08.gif" /></div>
                    </a>                    
                </div>
                {info}
            </div>
                
            </div>
            </div>
        )
    }
})