export default React.createClass({
    render(){
        return (
           <div>
           <div className="bzcontent">
               <p className="bzw1">保赚为您解决保单最后一笔资金的问题</p>
               <p className="bzw2">灵活、方便、快速的保险代付平台</p>
               <p className="bzw3">为您提供20万授信额度</p>
           </div>
           <div className="bzclist">
               <div className="bzclists">
                 <div className="bzclistimg">
                 <img src="images/homeimages/bzl1.gif"/>
                 </div>
                 <p className="bzlistp">线上提交</p>
                 <p>灵活测试</p>
               </div>
               <div  className="bzclistn">
               <div className="bzclistimg">
               <img src="images/homeimages/bzl2.gif"/>
                 </div>
                 <p className="bzlistp">随时随地</p>
                 <p>方便快捷</p>
               </div>
               <div className="bzclisto">
               <div className="bzclistimg">
               <img src="images/homeimages/bzl3.gif"/>
                 </div>
                 <p className="bzlistp">一键申请</p>
                 <p>立即放款</p>
               </div>
           </div>
           <div className="bzcbtn">立即授信</div>
           </div>
        )
    }
})