export default (state={
    Credit:{},
    My:{},
    LIST_1:{},
    LIST_2:{},
    LIST_3:{},
    infopage:"",
    step1:{},//第一步数据
    step2:{},//第二步数据
    step3:{},
    step4:{}
},action)=>{
    // console.log(state);
    // return state
    switch(action.type){
        case "STEP1":
        var newstate={}
        state.step1=action.data;
        Object.assign(newstate,state);
        return newstate;
        case "STEP2":
        var newstate={}
        state.step2=action.data;
        Object.assign(newstate,state);
        return newstate;
        case "STEP3":
        var newstate={}
        state.step3=action.data;
        Object.assign(newstate,state);
        return newstate;
        case "STEP4":
        var newstate={}
        state.step4=action.data;
        Object.assign(newstate,state);
        return newstate;
        case "Credit":
        var newstate={}
        state.Credit=action.data;
        Object.assign(newstate,state);
        return newstate;
        case "HOME":
        var newstate={};
        state.My=action.data;
        Object.assign(newstate,state);
        return newstate;
        break;
        case "LIST_1"://审核列表信息
        var newstate={};
        state.LIST_1=action.data
        Object.assign(newstate,state);
        return newstate;
        break;
        case "LIST_2"://待还款列表信息
        var newstate={};
        state.LIST_2=action.data
        Object.assign(newstate,state);
        return newstate;
        break;
        case "LIST_3"://已还款列表信息
        // console.log(action.data)
        var newstate={};
        state.LIST_3=action.data
        Object.assign(newstate,state);
        return newstate;
        break;
        case "INFO"://info信息
        
        var newstate={};
        state.infopage=action.data;
        Object.assign(newstate,state);
        return newstate;
        break;
        default:
        return state
        break;
        
    }
    
}