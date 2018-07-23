import {hashHistory,browserHistory} from "react-router";



export default React.createClass({
    getInitialState(){
        return {
            liked: true
        }
    },
    componentWillMount(){
        if(!sessionStorage.show){
            this.setState({
              liked:false
            })
        }
    },
    btn(){
        hashHistory.push("qr");
    },
    write(){
        // console.log(1);
        sessionStorage.info=JSON.stringify({page:1})
        localStorage.writed=true;//填写信息是从修改信息按钮进入
        hashHistory.push("information");
    },
    btn(){
        // console.log(this.props.his)
    },
    btt(){
        hashHistory.push("usecoupon");
    },
    phone(){
        alert(1212)
    }
    ,
    handleClicks: function(event) {
        this.setState({liked: !this.state.liked});
      },  
    render(){
        var tex = this.state.liked ? 'none' : 'block';
        var goback=null;
        var show=null;
        var write=null;
        var use=null;
        var tip=null;
        var phone=null;
        if(this.props.back){
            goback=(<div onClick={hashHistory.goBack} className="goback">
                <img src="images/images/back.png" />
            </div>)
        }
        if(this.props.show){
            show=(
                <div className="code" onClick={this.btn}>二维码</div>
            )
        }
        if(this.props.use){
            use=(
                <div className="code" onClick={this.btn}>使用规则</div>
            )
        }
        if(this.props.write){
            write=(
                <div className="write" onClick={this.write}>
                    <img src="images/images/write.png" />
                </div>
            )
        }
        if(this.props.tip){
            tip=(
                <div className="tip" onClick={this.btt}>
                    <img src="images/images/tip.png" />
                </div>
            )
        }
        if(this.props.phone){
            phone=(
                <div>
                <div className="phone" onClick={this.handleClicks}>
                    <img src="images/images/phone.png" /> 
                </div>
                <div className="phonea" style={{display:tex}} >
                    <div className="phoneb">
                        <p className="phone-w1">是否拨打客服电话</p>
                        <p className="phone-w2">400610160</p>
                        <div className="phonec">
                            <div className="phone-w3" onClick={this.handleClicks}>取消</div>
                            <a href="tel:400610160" className="phone-w4">确认</a>
                        </div>
                    </div>
                </div> 
                </div>
            )
        }
        return (
            <header className="header">
                {goback}
                {this.props.title}
                {show}
                {write}
                {use}
                {tip}
                {phone}
            </header>
        )
    }
})