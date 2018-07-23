import {Link} from "react-router";
export default React.createClass({
    render(){
        return (
            <footer className="footer_1">
                <Link to="home" className="home">
                <div
                    style={{background:"url(images/images/29683062252275484.png) 0% 0% no-repeat/100%",width:"0.39rem",height:"0.4rem"}}
                ></div>
                <p>提现</p>
                </Link>
                <Link to="my" className="my">
                <div
                    style={{background:"url(images/images/my_1.png) 0% 0% no-repeat/100%"}}
                ></div>
                <p>我的</p>
                </Link>
            </footer>
        )
    }
})