import {Link} from "react-router";
export default React.createClass({
    render(){
        return (
            <footer className="footer_3" 
                // style={{display:"flex"}}
            >
                <Link to="home" className="home"
                    style={{color:"#f99b47"}}
                >
                <div className="homeicon"
                    style={{background:"url(images/images/home_2.png) 0% 0% no-repeat/100%",width:"0.45rem",height:"0.4rem",marginTop:"0.18rem",
                    color:"#f99b47"}}
                ></div>
                <p
                    style={{marginTop:"0.08rem"}}
                >首页</p>
                </Link>
                <Link to={localStorage.Login?"my":"login"} className="my"
                    style={{color:"#858585"}}
                >
                <div
                    style={{background:"url(images/images/my_2.png) 0% 0% no-repeat/100%",width:"0.33rem",height:"0.38rem",
                    marginTop:"0.18rem"
                }}
                ></div>
                <p
                    style={{marginTop:"0.08rem"}}
                >我的</p>
                </Link>
            </footer>
        )
    }
})