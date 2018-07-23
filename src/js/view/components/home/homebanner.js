import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';


export default React.createClass({
    getInitialState(){
        return {
            imgurl:["images/homeimages/banner.gif"]
        }
    },
    render(){
        var imglist=this.state.imgurl.map((ii)=>{
            return <img key={ii} src={ii} />
        })
        return (
            <div className="banner">           
                {imglist}
            </div>
        )
    }
})


