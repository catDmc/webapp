import {  Checkbox } from 'antd-mobile';
import {Link,hashHistory} from "react-router";
import url from "../../config/config";
import {Pagination,Icon,Toast} from 'antd-mobile';
import store from "../../../store/store";
import { setTimeout } from 'timers';

var all=0;
export default React.createClass({
    getInitialState(){
        return {
          list:[],
          page:1,
          total:"",
          showpage:false,
          checkall:false,
          allmoney:0,
          num:0,
          li0:false,
          li1:false,
          li2:false,
          li3:false,
          li4:false,
          changelist:[true,false],
          selectedStores:[],
          changelist:true,
          orders:["","","","",""],//订单id
          moneylist:["","","","",""],
          ordernum:["","","","",""],//订单号 
          shownone:false,//显示状态栏和没订单 
        //   li1:true
        }
    },
    componentWillMount(){
        if(sessionStorage.loanlist2){
            this.setState(JSON.parse(sessionStorage.loanlist2))
            this.change(JSON.parse(sessionStorage.loanlist2).page)
        }else{
            this.change(this.state.page)
        }
    },
    componentWillUnmount(){
        sessionStorage.loanlist2=JSON.stringify(this.state)
    },
    changeall(e){
        this.setState({
            checkall:!this.state.checkall,
            orders:[],
            moneylist:[],
            allmoney:0,
            ordernum:[],
        })
        setTimeout(()=>{
            if(e.target.checked){//当全选框的状态是true时,把所有的状态都改为true
                this.setState({
                    li0:true,
                    li1:true,
                    li2:true,
                    li3:true,
                    li4:true,
                })
                all=this.state.list.length
                var allmoney=0;//先把总金额设置为0
                for(var i=0;i<this.state.list.length;i++){//再把订单号和每笔订单的金额都加进状态
                    this.state.moneylist.push(this.state.list[i].repayAmount);
                    this.state.orders.push(this.state.list[i].orderId);
                    this.state.ordernum.push(this.state.list[i].orderNo)
                    allmoney+=this.state.list[i].repayAmount  //计算总金额             
                }
                
                this.setState({
                    allmoney:allmoney
                })
            }else{//当全选为空时,把所有的状态改为false
                all=0;//把all标记也改为0
                this.setState({
                    li0:false,
                    li1:false,
                    li2:false,
                    li3:false,
                    li4:false,
                    orders:[],
                    moneylist:[],
                    allmoney:0,
                    orderNo:[]
                }) 
            }
        },100)

    },
    change(e){//获取列表
        all=0;//翻页也要设置为空
                this.setState({
                    li0:false,
                    li1:false,
                    li2:false,
                    li3:false,
                    li4:false,
                    orders:[],
                    moneylist:[],
                    allmoney:0,
                    checkall:false,//把全选按钮状态也改为空
                })
        this.setState({
            page:e
        })
        var that=this;
        var data=new FormData();
        data.append("userId",localStorage.userId);
        data.append("stateList",[40,52,55,60]);
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
                        showpage:false,
                        shownone:true
                    })
                }

                var info=[];
                for(var i=0;i<data.data.list.length;i++){
                    if(data.data.list[i].state=="40"||data.data.list[i].state=="52"||data.data.list[i].state=="60"||data.data.list[i].state=="55"){
                        // data.data.list[i]["info"]="待还款"
                        if(data.data.list[i].state=="40"){
                            data.data.list[i]["info"]="待还款"
                        }
                        else if(data.data.list[i].state=="52"){
                            data.data.list[i]["info"]="还款中"
                        }
                        else if(data.data.list[i].state=="55"){
                            data.data.list[i]["info"]="已延期"
                        }
                        else if(data.data.list[i].state=="60"){
                            data.data.list[i]["info"]="已逾期"
                        }
                        info.push(data.data.list[i]);
                    }
                }
                that.setState({list:info,total:data.data.pageInfo.total})
                
            }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
    },
    changelist(e,ind,index){//选择列表
        var li=e.target.value;
        if(index==0){
            this.setState({
                li0:e.target.checked
            })
        }
        if(index==1){
            this.setState({
                li1:e.target.checked
            })
        }
        if(index==2){
            this.setState({
                li2:e.target.checked
            })
        }
        if(index==3){
            this.setState({
                li3:e.target.checked
            })
        }
        if(index==4){
            this.setState({
                li4:e.target.checked
            })
        }       
        var that=this;
        if(e.target.checked==true){
            
            this.state.orders[index]=ind.orderId;//分别在数组加入金额和订单号
            this.state.moneylist[index]=ind.repayAmount;
            this.state.ordernum[index]=ind.orderNo
            all++;
            this.setState({
                allmoney:this.state.allmoney+ind.repayAmount*1
            })
            if(all==this.state.list.length){
                this.setState({
                    checkall:true
                })
            }
            
        }else{
            this.state.orders[index]="";
            this.state.moneylist[index]="";
            this.state.ordernum[index]="";
            this.setState({
                allmoney:this.state.allmoney-ind.repayAmount*1
            })
            all--;
            this.setState({
                checkall:false
            })
        };    
    },
    allpay(){//批量还款
        var newlist=[];
        var numlist=[];
        for(var i=0;i<this.state.orders.length;i++){
            if(this.state.orders[i]>0){
                newlist.push(this.state.orders[i])
            }
        }
        for(var i=0;i<this.state.ordernum.length;i++){
            if(this.state.ordernum[i].length>0){
                numlist.push(this.state.ordernum[i])
            }
        }
        let orders=newlist.join(",");
        let numli=numlist.join(",");
        if(this.state.allmoney=="0"){
            Toast.info("您还没有选择要还款的订单", 2);
        }else{
            hashHistory.push({pathname:"batchrepayment",query:{order:orders,orderid:numli,all:this.state.allmoney}})
        }
    },
    render(){
        var list=this.state.list.map((ind,index)=>{
            return (
                <div  className="repayments_list" to="repayment" key={index} ref="nu">
                    <Checkbox 
                        ref="nu1"
                        id=""
                        style={{marginLeft:"0.2rem"}}
                        value={`li${index}`}
                        checked={this.state[`li${index}`]}
                        onChange={(e)=>{
                            // console.log(e.target.value)
                            this.changelist(e,ind,index)
                        }}
                    />
                    <div className="info_left">
                        <p>{ind.createTime.split(" ")[0]}</p>
                        <p>{ind.amount}元</p>
                    </div>
                    <div className="info_right">
                        <p>应还</p>
                        <p>{ind.repayAmount}元</p>
                    </div>
                    <Link 
                    // to={{pathname:"repayment",query:{orderNo:ind.orderNo}}}
                    onClick={()=>{
                        hashHistory.push({pathname:"repayment",query:{orderNo:ind.orderNo}})
                    }}
                    >
                        <span>去还款</span>
                        <i
                            style={{background:"url(images/images/right.png)",backgroundSize:"100%"}}
                        ></i>
                    </Link>
                </div>
            )
        })
        var show=this.props.page==2?"":"none";
        var imgurl=this.props.page==1?"url(images/images/audit_2.png)":"url(images/images/audit_1.png)";
        return (
            <div className="repayments"
                style={{display:show}}
            >
                <div
                    className="shownone"
                    style={{display:this.state.shownone?"":"none"}}
                >
                    <img src="images/images/480580826510928901.png" />
                    <p>您还没有待还款订单</p>
                </div>
                <div className="checkall" onClick={this.btn}
                    style={{display:this.state.shownone?"none":""}}
                >
                    <label>
                        <Checkbox
                        ref="all"
                        checked={this.state.checkall}
                        onChange={this.changeall} 
                        style={{marginRight:"0.2rem"}}
                    />
                    全选</label>
                    <span className="allmoney">总计：<span>{this.state.allmoney}元</span></span>
                    <div className="click" onClick={this.allpay}
                        
                    >
                        批量还款
                    </div>
                </div>
                <div
                    style={{height:"7rem"}}
                >
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