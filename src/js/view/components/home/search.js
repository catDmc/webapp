import store from "../../../store/store";



export default React.createClass({
    getInitialState(){
        return {
            home:{
                sss:"111",
                ddd:""
            },
            bbb:""
        }
    },
    change(e){

        this.setState({
            bbb:e.target.value
            
        })

        
    },
    componentDidMount(){
        
        
    },
    componentWillMount(){
        console.log(store.getState().wangzhi.length)
       if(store.getState().wangzhi.length>0){
           this.setState({
               bbb:store.getState().wangzhi
           })
       }



    },
    componentWillUnmount(){
       
        store.dispatch({
            type:"SEARCH",
            data:this.state.bbb
        })
 
    },
    btn(){
  

    },
    render(){
        return (
            <div className="searchbox">
                <div className="searchcon">
                    <div className="imgleft">
                        <img src="images/homeimages/u30.png" />
                    </div>
                    <div className="inputbox">
                        <input type="text" value={this.state.bbb} placeholder="搜索" onChange={this.change}/>
                    </div>
                    <div className="imgright">
                        <img src="images/homeimages/u34.png" />
                    </div>    
                </div>
                <div className="searchtext" onClick={this.btn}>
                    <span>搜索</span>
                </div>
            </div>
        )
    }
})