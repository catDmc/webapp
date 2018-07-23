import {Link} from "react-router";
export default React.createClass({
    render(){
        return (
            <footer className="footer_3" 
                // style={{display:"flex"}}
            >
                <Link to="home" className="home"
                    style={{color:"#858585"}}
                >
                {/* <div className="homeicon"
                    style={{background:"url(images/images/58921901405805927.png) 0% 0% no-repeat/100%",width:"0.39rem",height:"0.4rem",marginTop:"0.18rem",
                    color:"#f99b47"}}
                ></div> */}
                <img className="homeicon" src="images/images/58921901405805927.png" 
                style={{background:"url(images/images/58921901405805927.png) 0% 0% no-repeat/100%",width:"0.39rem",height:"0.4rem",marginTop:"0.12rem",
                color:"#f99b47"}}
                />
                <p
                    style={{marginTop:"0.08rem"}}
                >首页</p>
                </Link>
                <Link to={localStorage.Login?"my":"login"} className="my"
                    style={{color:"#f99b47"}}
                >
                {/* <div
                    style={{background:"url(images/images/531594679828317007.png) 0% 0% no-repeat/100%",width:"0.32rem",height:"0.4rem",
                    marginTop:"0.18rem"
                }}
                ></div> */}
                <img src="images/images/531594679828317007.png" 
                    style={{width:"0.32rem",height:"0.4rem",marginTop:"0.12rem"}}
                />
                <p
                    style={{marginTop:"0.08rem"}}
                >我的</p>
                </Link>
            </footer>
        )
    }
})