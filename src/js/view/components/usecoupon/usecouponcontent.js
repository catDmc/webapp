export default React.createClass({
    render (){
        return (
            <div className="ucpboss">
                <div className="ucptop">
                    <div className="ucptopa"><img src="images/images/icon_05.png" /></div>
                    <div>保赚优惠券使用说明</div>
                </div>
                <div className="ucpbg" style={{background:"url(images/images/kopl.png)",backgroundSize:"100% 100%"}}>
                    <div className="ucpbga" style={{background:"url(images/images/ucpw.png)",backgroundSize:"100% 100%"}}>优惠券说明</div>
                    <div className="ucpbgb">
                        <p>1、优惠券仅在保赚平台使用，按面值额度减免支付。</p>
                        <p>2、优惠券获取方式：新用户成功注册登录后获得一张额</p>
                        <p>度40元的优惠券。</p>
                        <p>3、使用优惠券提交的订单，在借款订单提交时需勾选使</p>
                        <p>用优惠券，优惠券在订单审核成功放款时视为已使用，还</p>
                        <p>款金额系统将会做相应的减免；未成功放款的订单（包含</p>
                        <p>取消订单、审核不通过订单、放款失败订单等），系统自</p>
                        <p>动返还相应的优惠券，优惠券仍可以使用。订单使用优惠</p>
                        <p>券优惠后还款额度不会少于本金额度。</p>
                        <p>4、使用成功的优惠券不予返还。</p>
                        <p>5、一张优惠券仅能使用一次。</p>
                        <p>6、优惠券不能进行兑现、出售、转让或其他用途。</p>
                        <p>7、本规则由保赚团队依据国家相关法律法规及规章制度</p>
                        <p>予以解释。</p>
                    </div>
                </div>
            </div>
        )
    }
})