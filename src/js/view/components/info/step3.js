import {InputItem,ImagePicker,Toast,Picker,List,Modal} from "antd-mobile";
import url from "../../config/config";
// import store from "../../../store/store";
import {hashHistory,browserHistory,Link} from "react-router";
import {compress} from "../../../utils/imgCompress";
import { setTimeout } from "timers";
import { connect } from "react-redux";
var Home=React.createClass({
    getInitialState(){
        return {
            files:[],
            imgurl:"images/images/icon_11.jpg",
            imgup:"",
            certificateNo:"",
            companyName:[],
            title:"代理人",
            list:[],
            check:true,
            info:false,
            value:[],//保险公司列表
            value2:[],//职位列表
            modal1:false,
            showsearch:false,//显示搜索
            searchcon:"",//搜索框内容
        }
    },
    getinsurance(){//模糊搜索保险公司
        var that=this;
        var data=new FormData();
        data.append("companyName",this.state.searchcon);  
        fetch(url.url+"/api/act/mine/userInfo/insuranceList.htm",{
          headers:{
              token:localStorage.Token
          },
          method:"POST",body:data})
          .then(r=>r.json())
          .then((data)=>{
                var newlist=data.data.map((con)=>{
                        return {label:con.companyName,value:con.companyName}
                    })
               
                that.setState({
                    companyName:newlist,                
                }) 
                if(data.data.length==0){
                    that.setState({
                        pick:false,
                        companyName:[{label:'未找到匹配项',value:'未找到匹配项'}],            
                    })
            }
          })
    },
    componentWillUnmount(){
        const {dispatch}=this.props;
        dispatch({
            type:"STEP4",
            data:this.state
        })
    },
    componentWillMount(){
        const {step4}=this.props;
        if(step4.imgurl){
            this.setState(step4)
        }else{
            var that = this;
            $.ajax({
              type: "get",
              url: url.url + "/api/act/mine/userInfo/getUserInfo.htm",
              data: { userId: localStorage.userId },
              dataType: "json",
              headers: {
                "Content-Type": "text/plain;charset=UTF-8",
                token: localStorage.Token
              },
              success: function(data) {
                  that.setState({
                    certificateNo:data.data.certificateNo,
                    value:[data.data.companyName],
                    value2:[data.data.title],
                    imgurl:data.data.titleImg?data.data.titleImg:"images/images/icon_11.jpg",
                    imgup:data.data.titleImg,
                  })
              }
            });
        }
        this.setState({modal1:false});//每次进来确保加载框不出来
           var that=this;//查询信息是否完善
			var data=new FormData();
			data.append("userId",localStorage.userId);
	  
			fetch(url.url+"/api/act/mine/userInfo/getMyMessage.htm",{
			  headers:{
				  token:localStorage.Token
			  },
			  method:"POST",body:data})
			  .then(r=>r.json())
			  .then((data)=>{			
                  if(data.data.userInfo=="未完善"){                       
                  }else{
                    that.setState({
                        info:true
                    })
                  }
               
			  }).catch(function(e) {
                console.log("Oops, error");
                // Toast.info("服务器响应超时", 2);
        });
    },
    btn(){
        var that=this        
        var reg=/^[0-9]{26}$/ig;
        if(!reg.test(this.state.certificateNo)){
            Toast.info("请填写正确的资格证书号码", 2);
        }
        else if(!this.state.value[0]){
            Toast.info("请选择所属公司", 2);
        }
        else if(!this.state.value2[0]){
            Toast.info("请选择职务", 2);
        }
        else if(!this.state.imgup){
            Toast.info("请上传行销系统职位截图", 2);
        }else if(!this.state.check){
            Toast.info("请勾选授信协议", 2);
        }         
        else{
        var data=new FormData();
        data.append("certificateNo",this.state.certificateNo);
        data.append("companyName",this.state.value[0]);
        data.append("title",this.state.value2[0]);
        data.append("titleImg",this.state.imgup);       
        data.append("userId",localStorage.userId);
        fetch(url.url+"/api/act/mine/userInfo/saveWorkInfo.htm",{
        headers:{
            token:localStorage.Token
        },
        method:"POST",body:data})
        .then(r=>r.json())
        .then((data)=>{
            if(data.code=="200"){
                localStorage.couponinfo=JSON.stringify(data.data);
                Toast.info(data.msg, 2);              
                if(that.state.info){//判断信息是否获取过登陆优惠券
                    that.props.changepage();
                    setTimeout(function(){
                        hashHistory.push("my");
                    },50) 
                    
                                      
                }else{
                    switch(that.state.value2[0]){
                        case "代理人":
                        sessionStorage.creditmoney=20;
                        break;
                        case "主任":
                        sessionStorage.creditmoney=30;
                        break;
                        case "经理":
                        sessionStorage.creditmoney=40;
                        break;
                        case "总监":
                        sessionStorage.creditmoney=50;
                        break;
                    }
                    setTimeout(function(){                       
                        hashHistory.push("waitcoupon");
                    },200) 
                    
                   
                }                
            }else if(data.code=="400"){
                Toast.info(data.msg, 2);

            }else if(data.code=="410"){
                Toast.info("您的账号已在其他设备登录", 2); 
            }else if(data.code=="411"){
                Toast.info("登录已失效,请重新登录", 2); 
            }
        }).catch(function(e) {
                console.log("Oops, error");
                // Toast.info("服务器响应超时", 2);
        });
    }
    },
    onChange(files, type, index){
        var that=this;
        if(!this.judgeImgType(files[0].file.type)){
             Toast.info("上传图片格式仅支持jpg，jpeg，png格式", 2);
             return
        }
        var data=new FormData();
        that.setState({modal1:true},()=>{
            data.append("img",files[0].url);     
            fetch(url.url+"/api/act/mine/userInfo/saveImg.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
                that.setState({modal1:false});
                if(!data.data){
                        
                    if(data.code==400){
                        // Toast.info("上传图片格式仅支持jpg，jpeg，png格式", 2);
                    }else{
                        Toast.info("图片上传错误", 2);
                    }
                }else{
                    that.setState({
                        imgurl:data.data,
                        imgup:data.data
                        });
                }
               
                // that.setState({modal1:false});
            }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
                that.setState({modal1:false});  
            });           
        });
      },
    judgeImgType(file){
        var array = file.split('/');
        var index = array.length-1;
        if(array[index]=='jpg'||array[index]=='png'||array[index]=='jpeg'||array[index]=='JPG'||array[index]=='JPEG'||array[index]=='PNG'){
            return true;
        }else{
            return false;
        }
    },
    onClose(){
        this.setState({
        modal1: false,
        });
    },
    render(){
        const {files}=this.state;
        var showbox=this.props.page==4?"":"none";
        return (
            <div className="step_3" style={{display:showbox}}>
                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose}
                    title="提示"
                    className="imgInfo"
                    >
                    <div>                        
                        <img src="images/images/loading.gif" alt=""/>
                        <p>图片正在上传中...</p>
                    </div>
                </Modal>
                <div id="search" 
                    style={{display:this.state.showsearch?"":"none"}}//搜索
                >
                    <div
                        className="con"
                        style={{paddingLeft:"0"}}
                    >
                        <div className="small"
                            onClick={()=>{
                                this.setState({
                                    showsearch:false
                                })
                            }}
                            style={{background:"url(images/images/cha1.png) 0% 0%/100%"}}
                        >
                        </div>
                        <div className="title1">
                            请输入关键字
                        </div>
                        <div className="serbox">
                                <input type="text" value={this.state.searchcon}
                                    onChange={(e)=>{
                                        this.setState({
                                            searchcon:e.target.value
                                        })
                                    }}
                                />
                                <div
                                    style={{background:"url(images/images/168859449437151898.png) 0% 0% / 100%"}}
                                    onClick={this.getinsurance}
                                >
                                    <Picker extra="搜索"
                                    data={this.state.companyName}
                                    cols="1" 
                                    onOk={e => {
                                        if(e!='未找到匹配项'){
                                            
                                            this.setState({value:e,showsearch:false});
                                        }else{
                                            this.setState({value:'',showsearch:false});
                                        }
                                    }
                                }
                                                onDismiss={e => console.log('dismiss', e)}
                                                >
                                                <List.Item
                                                    style={{width:"4rem"}}
                                                ></List.Item>
                                                </Picker> 
                                </div>  
                        </div>                     
                    </div>
                </div>                           
                <div className="title">
                    <img src="images/images/title_3.jpg" />
                </div>
                <div className="con">
                    <div className="tip">
                    <img src="images/images/icon_05.png" />
                        职业信息
                    </div>
                    <div className="wrap">
                        <div className="price">
                            <div className="top">
                                <span>资格证书</span><InputItem
                                
                                value={this.state.certificateNo}
                                onChange={(e)=>{this.setState({
                                    certificateNo:e})}} 
                                style={{height:"0.52rem",fontSize:"0.28rem",flex:"1"}}
                                placeholder="请输入资格证书号码" />
                            </div>
                            <div className="top">
                                <span>所属公司</span>
                                <div
                                    style={{fontSize:"0.28rem",flex:"1"}}
                                    onClick={()=>{
                                        this.setState({
                                            showsearch:true
                                        })
                                    }}
                                >{this.state.value[0]?this.state.value[0]:"请选择承保公司"}</div>
                            </div>
                            <div className="top"
                                style={{borderTop:"1px solid #f89c47"}}
                            >
                                <span>职务</span>
                                <Picker extra="请选择职务"
                                    
                                    data={[{label:"代理人",value:"代理人"},{label:"主任",value:"主任"},{label:"经理",value:"经理"},{label:"总监",value:"总监"},]}
                                    cols="1" 
                                    value={this.state.value2}                                  
                                    onOk={e => {this.setState({value2:e})}}
                                    onDismiss={e => console.log('dismiss', e)}
                                    >
                                    <List.Item
                                        style={{width:"4rem"}}
                                    ></List.Item>
                                    </Picker>
                               
                            </div>
                            <div className="upimg">
                                上传行销系统职位截图
                            </div>
                            <div className="img_box">
                                <div className="left">
                                    <div
                                    style={{position:"relative",overflow:"hidden"}}
                                    >
                                        <img src={this.state.imgurl} />
                                        <ImagePicker
                                        style={{position:"absolute",top:"0",left:"0",width:"16rem",height:"15rem",opacity:"0"}}
                                        files={files}
                                        onChange={this.onChange}
                                        onImageClick={(index, fs) => console.log(index, fs)}
                                        selectable={files.length <1}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sub">
                        <input type="checkbox" defaultChecked={this.state.check} onChange={()=>{this.setState({check:!this.state.check})}}/>
                        <p>同意</p>
                        <Link to="auth">《授信协议》</Link>
                    </div>
                    <div className="step">
                        <button onClick={()=>{this.props.step(2)}}>上一步</button><button onClick={this.btn}>提交</button>
                    </div>  
                    
                </div>
            </div>
            
        )
    }
})
var mapStateToProps = state => {
    return {
      step4: state.step4
    };
  };
  
  export default connect(mapStateToProps)(Home);