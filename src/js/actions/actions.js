import store from "../store/store";

export const add=function(data){
    alert("1")
    return {
        type:"111",
        data
    }
}
export const reduce=(data)=>{
    console.log(222)
}


export const fetchFriend = (id) => {
//异步function
    return async (dispatch) => {
        try {
//异步等待，如果服务器有响应，那么进入then方法，否则跳到catch
            await fetch(`http://localhost/wangzhi/getall.php`)
                .then(response => {
//dispatch receiveFriends方法
                    dispatch(receiveFriends(response))
                })
        } catch (error) {
            console.log('error: ', error)
        }
    }
}

const receiveFriends = (response) => {
    return {
        type: 'RECEIVE_FRIENDS',
        payload: response.data
    }
}