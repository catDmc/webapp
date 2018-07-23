import {InputItem,ImagePicker,Toast,Picker,List,Modal} from "antd-mobile";
import url from "../../config/config";
import {compress} from "../../../utils/imgCompress";
import bank from "../method/bank";
import { connect } from "react-redux";
var Home=React.createClass({
    getInitialState(){
        return {
            files:[],
            creditcard:"",
            imgurl3:"images/images/icon_09.jpg",
            imgurl4:"images/images/icon_10.jpg",
            imgup3:"",
            imgup4:"",
            // value:["中国工商银行"],//银行名称
            value2:[""],//信用卡名称
            banklist:[],
        }
    },
    
    componentWillUnmount(){
        const {dispatch}=this.props;
        dispatch({
            type:"STEP3",
            data:this.state
        })
    },
    componentWillMount(){
        console.log(1)
        const {step3}=this.props;
        if(step3.imgurl3){
            this.setState(step3)
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
                    imgurl3:data.data.creditFrontImg?data.data.creditFrontImg:"images/images/icon_09.jpg",
                    imgurl4:data.data.creditBackImg?data.data.creditBackImg:"images/images/icon_10.jpg",
                    imgup3:data.data.creditFrontImg,
                    imgup4:data.data.creditBackImg,
                    value2:[data.data.creditBank],
                    creditcard:data.data.creditCardNo,
                  })
              }
            });
        }
        this.setState({modal1:false});//每次进来确保加载框不出来      
        var that=this;
         fetch(url.url+"/api/act/mine/bank/list.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"get"})
            .then(r=>r.json())
            .then((data)=>{
                if(data.code=="410"){
                    Toast.info("您的账号已在其他设备登录", 2);
                    setTimeout(function(){
                        hashHistory.push("login")
                    },1000) 
                }else if(data.code=="411"){
                    Toast.info("登录已失效,请重新登录", 2);
                    setTimeout(function(){
                        hashHistory.push("login")
                    },1000) 
                }else if(data.code=="408"){
                    Toast.info("系统响应超时", 2);
                  }else if(data.code=="500"){
                    Toast.info("系统错误", 2);
                  }else{
                    var newlist=data.data.map((con)=>{
                        return {
                            label:con.bankName,
                            value:con.bankName
                        }
                    })
                    that.setState({
                        banklist:newlist,
                        creditcardlist:data.data
                    })
                  }
                
                
            }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
            
       
    },
    btn(){
        console.log(this.state)
        if(!this.state.value2[0]){
            Toast.info("请填择发卡行", 2);
        }else if(!this.state.creditcard){
            Toast.info("请填写信用卡号", 2);
            
        }else if(this.state.creditcard==this.state.bankcard){
            Toast.info("请填写正确的信用卡号", 2);
        }
        else if(!this.state.imgup3){
            Toast.info("请上传信用卡正面", 2);            
        }else if(!this.state.imgup4){
            Toast.info("请上传信用卡背面", 2);
            
        }else{        
        console.log(this.state);
        console.log(localStorage.userId)
        var that=this;//保存银行卡信用卡接口
        var data=new FormData();
        data.append("creditBank",this.state.value2[0]);
        data.append("creditNo",this.state.creditcard);
        data.append("creditbackImg",this.state.imgup3);
        data.append("creditfrontImg",this.state.imgup4);
        data.append("userId",localStorage.userId);
        fetch(url.url+"/api/act/mine/bank/saveCredit.htm",{
        headers:{
            token:localStorage.Token
        },
        method:"POST",body:data})
        .then(r=>r.json())
        .then((data)=>{
            console.log(data);
            if(data.code=="200"){
                that.props.step(4)
            }else if(data.code=="400"){
                Toast.info(data.msg, 2);
            }
        }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
    }
    },
    upimg(files){
        var that=this;
        return new Promise(function(suc,err){
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
                        suc(data)
                    }
                    
                    
                }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
                that.setState({modal1:false});  
            });
        });
    })     
           
    },
    onChange3(files, type, index){
        var that=this;
        if(!this.judgeImgType(files[0].file.type)){
             Toast.info("上传图片格式仅支持jpg，jpeg，png格式", 2);
             return
        }
        this.upimg(files).then((data)=>{
            that.setState({
                imgurl3:data.data,
                imgup3:data.data
            })
        })
      },
    onChange4(files, type, index){
        var that=this;
        if(!this.judgeImgType(files[0].file.type)){
             Toast.info("上传图片格式仅支持jpg，jpeg，png格式", 2);
             return
        }
        this.upimg(files).then((data)=>{
            that.setState({
                imgurl4:data.data,
                imgup4:data.data
            })
        })
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
        var showbox=this.props.page==3?"":"none";
        return (
            <div className="step_2" style={{display:showbox}}>
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
                <div className="title">
                    <img src="images/images/title.jpg" />
                </div>
                <div className="con">
                    <div className="tip">
                    <img src="images/images/icon_05.png" />
                        信用卡信息
                    </div>
                    <div className="wrap">
                        <div className="price">
                            <div className="top">
                                <span>发卡行</span>
                                <Picker extra="请选择发卡行"
                                    
                                    data={this.state.banklist}
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
                            <div className="top">
                                <span>信用卡号</span><InputItem
                                value={this.state.creditcard}
                                onChange={(e)=>{
                                    this.setState({
                                        creditcard:e
                                    })
                                }} 
                                style={{height:"0.52rem",fontSize:"0.28rem",width:"4rem"}}
                                placeholder="请输入信用卡号" />
                            </div>
                            <div className="upimg">
                                上传信用卡照片
                            </div>
                            <div className="img_box">
                                <div className="left">
                                    <div 
                                        style={{position:"relative",overflow:"hidden"}}
                                    >
                                        <img src={this.state.imgurl3} />
                                        <ImagePicker
                                        style={{position:"absolute",top:"0",left:"0",width:"16rem",height:"15rem",opacity:"0"}}
                                        files={files}
                                        onChange={this.onChange3}
                                        onImageClick={(index, fs) => console.log(index, fs)}
                                        selectable={files.length <1}
                                        />
                                    </div>
                                    
                                    <p>信用卡正面</p>
                                </div>
                                <div className="right">
                                    <div
                                        style={{position:"relative",overflow:"hidden"}}
                                    >
                                        <img src={this.state.imgurl4} />
                                        <ImagePicker
                                        style={{position:"absolute",top:"0",left:"0",width:"16rem",height:"15rem",opacity:"0"}}
                                        files={files}
                                        onChange={this.onChange4}
                                        onImageClick={(index, fs) => console.log(index, fs)}
                                        selectable={files.length <1}
                                        />
                                    </div>
                                    
                                    <p>信用卡背面</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="step">
                        <button onClick={                                                      
                            ()=>{this.props.step(2)}}>上一步</button> <button onClick={                                
                                this.btn}>下一步</button>
                    </div>  
                </div>
            </div>
        )
    }
})
var mapStateToProps = state => {
    return {
      step3: state.step3
    };
  };
  
  export default connect(mapStateToProps)(Home);