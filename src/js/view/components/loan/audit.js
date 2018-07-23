import {Link,hashHistory} from "react-router";
import url from "../../config/config";
import {Pagination,Icon,Toast} from 'antd-mobile';
import store from "../../../store/store";
export default React.createClass({
    getInitialState(){
        return {
            list:[],
            list1:[],
            total:"",
            page:1,
            showpage:false,//显示没分页器
            shownone:false,//显示没订单
        }
    },
    componentWillMount(){
        if(sessionStorage.loanlist1){
            this.setState(JSON.parse(sessionStorage.loanlist1))
            this.change(JSON.parse(sessionStorage.loanlist1).page)
        }else{
            this.change(this.state.page)
        }   
    },
    componentWillUnmount(){
        sessionStorage.loanlist1=JSON.stringify(this.state)
    },
    change(e){
        this.setState({
            page:e
        })
        var that=this;
        var data=new FormData();
        data.append("userId",localStorage.userId);
        data.append("stateList",[10,20,30,31,41]);
        data.append("page",e);
        data.append("pageSize",5);
        fetch(url.url+"/api/act/mine/borrow/list.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
                console.log(data)
                switch(data.code){
                case 408:    Toast.info('系统响应超时', 1);
                                break;
                case 411:    Toast.info('用户信息过期，请重新登录', 1);
                                localStorage.clear();
                                sessionStorage.clear();
                                hashHistory.push("login");
                                break;
                case 410:    Toast.info('用户已在其他设备登录，请重新登录', 1);
                                localStorage.clear();
                                sessionStorage.clear();
                                hashHistory.push("login");
                                break;
                case 500:    Toast.info('系统错误', 1);
                                break;
                case 130001:    Toast.info('获取订单列表服务超时', 1);
                                break;
                case 130003:    Toast.info('获取订单详情服务失败，请稍后再次尝试', 1);
                                break;
                default:        break;
                }
                if(data.data.list.length>0){
                    
                    that.setState({
                        showpage:true,
                        shownone:false
                    })
                }else{
                    that.setState({
                        shownone:true,
                        showpage:false
                    })
                }
                var info=[];
                for(var i=0;i<data.data.list.length;i++){
                    if(data.data.list[i].state=="10"||data.data.list[i].state=="20"||data.data.list[i].state=="21"||data.data.list[i].state=="30"||data.data.list[i].state=="31"||data.data.list[i].state=="41"){
                        // data.data.list[i]["info"]="审核中"
                        if(data.data.list[i].state=="10"||data.data.list[i].state=="20"||data.data.list[i].state=="30"){
                            data.data.list[i]["info"]="审核中"
                        }else if(data.data.list[i].state=="31"||data.data.list[i].state=="41"){
                            data.data.list[i]["info"]="放款中"
                        }
                        info.push(data.data.list[i]);
                    }
                }
                that.setState({list:info,total:data.data.pageInfo.total
                })
            }).catch(function(e) {
                console.log("Oops, error");
                // Toast.info("服务器响应超时", 2);
        });
    },
    render(){
        var list=null;
        if(this.state.list.length>0){
            list=this.state.list.map((ind,index)=>{
                return (
                    <Link 
                    // to={{pathname:"txing",query:{orderId:ind.orderNo,state:ind.state}}} 
                    className="audit_list" key={index}
                        onClick={()=>{
                            hashHistory.push({pathname:"txing",query:{orderId:ind.orderNo,state:ind.state}})
                        }}
                    >
                                <div className="price">
                                <p>{ind.realAmount}</p>
                                <p>{ind.createTime.split(" ")[0]}</p>
                                </div>
                                <span>{ind.info}</span>
                                <i
                                    style={{background:"url(images/images/right.png)",backgroundSize:"100%"}}
                                ></i>
                            </Link>
                )
            })
        }
        var show=this.props.page==1?"":"none";
        return (
            <div className="audit"
                style={{display:show}}
            >   <div
                style={{height:"7rem"}}
            >
                <div
                    onClick={()=>{
                        console.log(this.state)
                    }}
                    className="shownone"
                    style={{display:this.state.shownone?"":"none"}}
                >
                    <img src="images/images/480580826510928901.png" />
                    <p>您还没有借款记录</p>
                </div>
                {list}
                </div>             
                
                <Pagination total={Math.ceil(this.state.total/5)}
                 className="custom-pagination-with-icon"
                 style={{display:this.state.showpage?"":"none"}}
                current={this.state.page}
                onChange={(e)=>{
                    this.change(e)
                }}
                locale={{
                prevText: (<span className="arrow-align" onClick={()=>{
                    
                }}>上一页</span>),
                 nextText: (<span className="arrow-align">下一页</span>),
                }}
                />                
            </div>
        )
    }
})