import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
import {hashHistory,browserHistory} from "react-router";


export default React.createClass({
  getInitialState(){
    return {
      ddd:""
    }
  },
  btn(e){
      this.setState({
        ddd:e.target.value
      })
  },
    render(){
        return (
            <List 
            
            >
           
            <Item

            arrow="horizontal"
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            multipleLine
            onClick={() => {hashHistory.push("merchants")}}
          >
          商户名 <Brief>极速放款，十分钟到账</Brief>
          </Item>
          <Item
            arrow="horizontal"
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            multipleLine
            onClick={() => {hashHistory.push("merchants")}}
          >
          商户名 <Brief>极速放款，十分钟到账</Brief>
          </Item>
          <Item
            arrow="horizontal"
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            multipleLine
            onClick={() => {hashHistory.push("merchants")}}
          >
          商户名 <Brief>极速放款，十分钟到账</Brief>
          </Item>
          <Item
            arrow="horizontal"
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            multipleLine
            onClick={() => {hashHistory.push("merchants")}}
          >
          商户名 <Brief>极速放款，十分钟到账</Brief>
          </Item>
       
          </List>

        )
    }
})