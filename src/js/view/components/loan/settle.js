import {Link,hashHistory} from "react-router";
import url from "../../config/config";
import {Pagination,Icon,Toast} from 'antd-mobile';
import store from "../../../store/store";
export default React.createClass({
    getInitialState(){
        return {
            list:[],
            createTime:"",
            showpage:false,
            page:1,
            total:"",
            shownone:false
        }
    },
    componentWillMount(){
        if(sessionStorage.loanlist3){
            this.setState(JSON.parse(sessionStorage.loanlist3))
            this.change(JSON.parse(sessionStorage.loanlist3).page)
        }else{
            this.change(this.state.page)
        }
    },
    componentWillUnmount(){
        sessionStorage.loanlist3=JSON.stringify(this.state)
    },
    change(e){
        this.setState({//改变页数的时候们也要设置对应状态,卸载时保存进reduce
            page:e
        })
        var that=this;
        var data=new FormData();
        data.append("userId",localStorage.userId);
        data.append("stateList",[21,32,50,51]);
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
                    if(data.data.list[i].state=="50"||data.data.list[i].state=="51"){
                        data.data.list[i]["info"]="已还款"
                    }
                    else if(data.data.list[i].state=="21"){
                            data.data.list[i]["info"]="人工审核未通过"
                        }
                        else if(data.data.list[i].state=="32"){
                            data.data.list[i]["info"]="放款审核未通过"
                        }
                        info.push(data.data.list[i]);
                }
                that.setState({
                    list:info,
                    total:data.data.pageInfo.total
                })
                
            }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
    },
    render(){
        var show=this.props.page==3?"":"none";
        var list=null;
        if(this.state.list.length>0){
            list=this.state.list.map((ind,index)=>{
                return (
                <Link className="audit_list" 
                // to={{pathname:ind.state==21||ind.state==32||ind.state==41?"txing":"already",query:{orderId:ind.orderNo,state:ind.state}}} 
                onClick={()=>{
                    hashHistory.push({pathname:ind.state==21||ind.state==32||ind.state==41?"txing":"already",query:{orderId:ind.orderNo,state:ind.state}})
                }}
                key={index}>
                    <div className="price">
                        <p>{ind.state==21||ind.state==32||ind.state==41?ind.realAmount:ind.repayAmount}</p>
                        <p>{ind.createTime.split(" ")[0]}</p>
                    </div>
                    <span>{ind.info}</span>
                    <i
                        style={{background:"url(images/images/right.png)",backgroundSize:"100%",marginLeft:"0.3rem"}}
                    ></i>
                </Link>
                )
            })
        }
        return (
            <div className="audit"
                style={{display:show}}
            >   
                <div 
                    style={{height:"7rem"}}
                >
                <div
                    className="shownone"
                    style={{display:this.state.shownone?"block":"none"}}
                >
                    <img src="images/images/480580826510928901.png" />
                    <p>您还没有已结束记录</p>
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