export default React.createClass({
    getInitialState: function() {
        return {liked: true};
      },
      componentWillMount(){
          // sessionStorage.show=true{

          // }
          // console.lo
          if(!sessionStorage.show){
              this.setState({
                liked:false
              })
          }
      },
      handleClick: function(event) {
        sessionStorage.show=true
        this.setState({liked: !this.state.liked});
      },
      render: function() {
        var text = this.state.liked ? 'none' : 'block';
        return (
          <div style={{display:text}} className="pupops">
            <div className="pooa"></div>
            <div className="poob">
              <img src="images/homeimages/tcc_03.gif"/>
            </div>
            <div className="pooc"  onClick={this.handleClick}>×</div>
          </div>
        );
      }
    });
