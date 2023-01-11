//组件数据共享
import {createStore} from 'vuex';
//从插件引入持久化方法
import createPersistedState from 'vuex-persistedstate';
const store = createStore({
    //数据
    state(){
        return {
            //当前路径
            currentPath:'/',
            //用户信息
            userInfo:{}
        }
    },
    mutations:{
        //操作数据的函数
        //更新当前路径,payload是形参--接收实际参数
        updateCurrentPath(state,payload){
            state.currentPath =payload;
        },
        updateUserInfo(state,payload){
            state.userInfo =payload;
        },
    },
    //将用户名持久化
    plugins:[
        createPersistedState({
            reducer:state=>{
                return{
                    //将state中的userInfo持久化
                    userInfo: state.userInfo
                }
            }
        })
    ]
})
//默认暴露
export default store;