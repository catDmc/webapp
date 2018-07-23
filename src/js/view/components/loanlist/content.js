import {InputItem,Toast,Picker,List} from "antd-mobile";
import url from "../../config/config";
import {hashHistory} from "react-router";
export default React.createClass({
    getInitialState(){
        return {
            num:"",
            ti1:"自持",
            ti2:"全款",
            ti3:1,
            ti4:"全款",
            ti5:1,
            ti6:1,
            ti7:1,
            ti8:["0-3000元/月"],
            liked: true,
            showMortgage:true,//是否显示按揭
            showExtension:false,//是否显示延期
        }
    },
    componentWillMount(){
        if(!sessionStorage.show){
            this.setState({
              liked:false
            })
        }
    },
    handleClicks: function(event) {
        this.setState({liked: !this.state.liked});
      },
    btn(){
        var mortgage=this.state.ti2;//按揭情况
        var extension=this.state.ti3;//延期情况
        if(/^[1-9]{1}[0-9]{0,5}$/g.test(this.state.num)){
            if(this.state.ti1=="自持"){
                extension=null;
            }else if(this.state.ti1=="租赁"){
                mortgage=""
            }else{
                mortgage="";
                extension=null;
            }
        var data=new FormData();
        data.append("accumulationFund",this.state.ti5);
        data.append("carMortgage",this.state.ti4);
        data.append("houseExtension",extension);
        data.append("houseMortgage",mortgage);
        data.append("houseOwnership",this.state.ti1);
        data.append("insuranceInfo",this.state.ti7);
        data.append("loanAmount",this.state.num);
        data.append("salary",this.state.ti8[0]);
        data.append("socialSecurity",this.state.ti6);
        data.append("userId",localStorage.userId);
        fetch(url.url+"/api/act/mine/userExtraInfo/saveWantLoan.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
                console.log(data)
                if(data.code=="240013"){
                    Toast.info(data.msg, 2);
                    hashHistory.push("home")
                }else{
                    Toast.info(data.msg, 2);
                }
            }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });            
    }else{
        Toast.info("请输入正确的借款金额",1)
    }
    }, 
    render(){
        var tex = this.state.liked ? 'none' : 'block';
        return (
            <div className="list_con">
                
                <div className="tip">
                    {/* <i
                        style={{background:"url(images/images/icon_05.png) 0% 0% no-repeat/100%"}}
                    ></i> */}
                    <img src="images/images/icon_05.png" />
                    <div>请输入您的贷款信息我们将根据您的需求为您提供最适合您的产品。</div>
                </div>
                <div className="title">
                    <i
                        style={{background:"url(images/images/10475463301731984.png) no-repeat 0% 0% /100%"}}
                    ></i>
                    <span
                    style={{width:"2rem"}}
                    >借款金额</span>
                    <InputItem
                    value={this.state.num}
                    onChange={(e)=>{this.setState({num:e})}}
                    style={{height:"0.42rem",fontSize:"0.28rem",marginLeft:"0.2rem"}} 
                    placeholder="请输入借款金额"
                    />
                </div>
                <div className="tips">
                <img src="images/images/icon_05.png" />
                    <span>房产信息</span>
                </div>
                <div className="list_info">
                    <div>
                        <span>所有权：</span>
                        <span><label><div
                            style={{background:this.state.ti1=="自持"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                        >
                        <input type="radio" name="ti1" defaultChecked={this.state.ti1=="自持"?"true":""} onChange={(e)=>{
                            if(e.target.checked){
                                this.setState({
                                    showMortgage:true,
                                    showExtension:false,
                                    // ti3:null
                                })
                            }
                            this.setState({
                                ti1:"自持"
                            })
                        }}/>
                            </div>自持</label></span>
                        <span
                        ><label><div
                        style={{background:this.state.ti1=="租赁"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                        ><input type="radio"  name="ti1" defaultChecked={this.state.ti1=="租赁"?"true":""} onChange={(e)=>{
                            if(e.target.checked){
                                this.setState({
                                    showMortgage:false,
                                    showExtension:true,
                                    // ti2:""
                                })
                            }
                            this.setState({
                                ti1:"租赁"
                            })
                        }}/></div>租赁</label></span>
                        <span
                            style={{marginLeft:"0.54rem"}}
                        ><label><div
                        style={{background:this.state.ti1=="无"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                        ><input type="radio"  name="ti1" defaultChecked={this.state.ti1=="无"?"true":""} onChange={(e)=>{
                            if(e.target.checked){
                                this.setState({
                                    showMortgage:false,
                                    showExtension:false,
                                    // ti2:"",
                                    // ti3:null
                                })
                            }
                            this.setState({
                                ti1:"无"
                            })
                        }}/></div>无</label></span>
                    </div>
                    <div
                        style={{display:this.state.showMortgage?"":"none",borderTop:"1px solid #ffe7c0"}}
                    >
                        <span>按揭情况：</span>
                        <span><label><div
                            style={{background:this.state.ti2=="全款"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                        >
                        <input type="radio" name="ti2" defaultChecked={this.state.ti2=="全款"?"true":""} onChange={()=>{
                            this.setState({
                                ti2:"全款"
                            })
                        }}/>
                            </div>全款</label></span>
                        <span
                        ><label><div
                        style={{background:this.state.ti2=="按揭"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                        ><input type="radio"  name="ti2" defaultChecked={this.state.ti2=="按揭"?"true":""} onChange={()=>{
                            this.setState({
                                ti2:"按揭"
                            })
                        }}/></div>按揭</label></span>
                        <span
                            style={{marginLeft:"0.54rem"}}
                        ><label><div
                        style={{background:this.state.ti2=="无"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                        ><input type="radio"  name="ti2" defaultChecked={this.state.ti2=="无"?"true":""} onChange={()=>{
                            this.setState({
                                ti2:"无"
                            })
                        }}/></div>无</label></span>
                    </div>
                    <div
                        style={{display:this.state.showExtension?"":"none",borderTop:"1px solid #ffe7c0"}}
                    >
                        <span>是否延期：</span>
                        <span><label><div
                            style={{background:this.state.ti3=="1"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                        >
                        <input type="radio" name="ti3" defaultChecked={this.state.ti3=="1"?"true":""} onChange={()=>{
                            this.setState({
                                ti3:"1"
                            })
                        }}/>
                            </div>是</label></span>
                        <span
                        ><label><div
                        style={{background:this.state.ti3=="0"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                        ><input type="radio"  name="ti3" defaultChecked={this.state.ti3=="0"?"true":""} onChange={()=>{
                            this.setState({
                                ti3:"0"
                            })
                        }}/></div>否</label></span>                       
                    </div>
                </div>
                <div className="tips">
                <img src="images/images/icon_05.png" />
                    <span>车辆情况</span>
                </div>
                <div className="list_info">
                    <div>
                        <span>按揭情况：</span>
                        <span><label><div
                            style={{background:this.state.ti4=="全款"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                        >
                        <input type="radio" name="ti4" defaultChecked={this.state.ti4=="全款"?"true":""} onChange={()=>{
                            this.setState({
                                ti4:"全款"
                            })
                        }}/>
                            </div>全款</label></span>
                        <span
                        ><label><div
                        style={{background:this.state.ti4=="按揭"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                        ><input type="radio"  name="ti4" defaultChecked={this.state.ti4=="按揭"?"true":""} onChange={()=>{
                            this.setState({
                                ti4:"按揭"
                            })
                        }}/></div>按揭</label></span>
                        <span
                            style={{marginLeft:"0.54rem"}}
                        ><label><div
                        style={{background:this.state.ti4=="无"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                        ><input type="radio"  name="ti4" defaultChecked={this.state.ti4=="无"?"true":""} onChange={()=>{
                            this.setState({
                                ti4:"无"
                            })
                        }}/></div>无</label></span>
                    </div>
                </div>
                <div className="tips">
                <img src="images/images/icon_05.png" />
                    <span>公积金信息</span>
                </div>
                <div className="list_info">
                    <div>
                        <span>缴纳情况：</span>
                        <span><label><div
                            style={{background:this.state.ti5=="1"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                        >
                        <input type="radio" name="ti5" defaultChecked={this.state.ti5=="1"?"true":""} onChange={()=>{
                            this.setState({
                                ti5:"1"
                            })
                        }}/>
                            </div>是</label></span>
                        <span
                        ><label><div
                        style={{background:this.state.ti5=="0"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                        ><input type="radio"  name="ti5" defaultChecked={this.state.ti5=="0"?"true":""} onChange={()=>{
                            this.setState({
                                ti5:"0"
                            })
                        }}/></div>否</label></span>  
                    </div>
                </div>
                <div className="tips">
                <img src="images/images/icon_05.png" />
                    <span>社保信息</span>
                </div>
                <div className="list_info">
                    <div>
                    <span>缴纳情况：</span>
                    <span><label><div
                    style={{background:this.state.ti6=="1"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                >
                <input type="radio" name="ti6" defaultChecked={this.state.ti6=="1"?"true":""} onChange={()=>{
                    this.setState({
                        ti6:"1"
                    })
                }}/>
                    </div>是</label></span>
                <span
                ><label><div
                style={{background:this.state.ti6=="0"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                ><input type="radio"  name="ti6" defaultChecked={this.state.ti6=="0"?"true":""} onChange={()=>{
                    this.setState({
                        ti6:"0"
                    })
                }}/></div>否</label></span>
                    </div>
                </div>
                <div className="tips">
                <img src="images/images/icon_05.png" />
                    <span>工资流水信息</span>
                </div>
                <div className="list_info">
                    <div>
                        <span>工资流水：</span>
                        <Picker extra="请选择职务"
                                    
                                    data={[{label:"0-3000元/月",value:"0-3000元/月"},{label:"3001-6000元/月",value:"3001-6000元/月"},{label:"6001-9000元/月",value:"6001-9000元/月"},{label:"9001-12000元/月",value:"9001-12000元/月"},{label:"大于12000元/月",value:"大于12000元/月"}]}
                                    cols="1" 
                                    value={this.state.ti8}                                  
                                    onOk={e => {this.setState({ti8:e})}}
                                    onDismiss={e => console.log('dismiss', e)}
                                    >
                                    <List.Item
                                        style={{width:"4rem"}}
                                    ></List.Item>
                        </Picker>
                    </div>
                </div>
                <div className="tips">
                <img src="images/images/icon_05.png" />
                    <span>保险信息</span>
                </div>
                <div className="list_info">
                    <div>
                        <span>是否有保险：</span>
                        <span><label><div
                            style={{background:this.state.ti7=="1"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                        >
                        <input type="radio" name="ti7" defaultChecked={this.state.ti7=="1"?"true":""} onChange={()=>{
                            this.setState({
                                ti7:"1"
                            })
                        }}/>
                            </div>有</label></span>
                        <span
                        ><label><div
                        style={{background:this.state.ti7=="0"?"url(images/images/small-2.png) 0% 0% /100%":"url(images/images/small-1.jpg) 0% 0% /100%"}}
                        ><input type="radio"  name="ti7" defaultChecked={this.state.ti7=="0"?"true":""} onChange={()=>{
                            this.setState({
                                ti7:"0"
                            })
                        }}/></div>无</label></span> 
                    </div>
                </div>
                <div className="submit">
                    <button  onClick={this.btn}>提交</button>
                </div>
            </div>
        )
    }
})