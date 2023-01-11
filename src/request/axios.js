import axios from 'axios'


//进行axios的封装
//首先是根据开发环境确定使用的默认前置url
switch(process.env.NODE_ENV)
{
     //生产环境
     case 'production':
        axios.defaults.baseURL='http://121.89.205.189:3001/admin'
        // axios.defaults.baseURL = 'http://121.89.205.189:3001/admin';
        break;
      //开发环境
      case 'development':
        axios.defaults.baseURL = '/ser';
        break;
}

//其次是配置拦截器，其在响应发送前和响应内容接受后作用,常用于token的上传和本地存储
//.use方法格式固定,需要两个餐返回值的函数，且第一个的参数为config,函数返回修改过的config,第二个参数为error,返Promise.reject(error)
//① token上传
axios.interceptors.request.use(config => {
// Do something before request is sent
//如果token存在的话，就在config里添加token,否则就不添加
// if(localStorage.getItem('token'))
// {
//   config.headers.token=localStorage.getItem('token');
// };
//简易写法,短路运算
// localStorage.getItem('token')&&(config.headers.token = localStorage.getItem("token"));
//但其实这种写法，localstorage的方法调用次数有点多
//所以优化成下面的写法
const token=localStorage.getItem('token');
//所有将内容转化为bool类型的过程都存在将0判断为false的问题，所以如果取值可能为0时要注意对false的判断的取值
console.log("这一步难道没有执行？");
console.log(token);

token&&(config.headers.token=token);

return config;
},error => {
// Do something with request error
return Promise.reject(error);
});

//从响应中获取token
axios.interceptors.response.use(response => {
// Do something before response is sent
//①正常请求返回无论如何都应该有token,且向同一个服务器请求数据的token的位置是固定的
//所以需要进行的操作是，能获取到token时就获取token,不能获取到token时就把现存的token销毁


const token=response.data?.data?.token;

token&&localStorage.setItem('token',token)

//消息提示
//不太确认这里是单纯的设置了message还是会直接弹出message
ElMessage({
  message:response.data.message,
  //根据响应状态码显示不同颜色
  type: response.data.code==='200'?'success':'error',
})


return response;

},error => {
// Do something with response error
//解构err并分析内容
const {response} = error;
    //存在response，则将响应状态码拿出来
    if(response){
        //response.status是响应状态码
        switch(response.status){
            case 401:break;
            //403表示token过期
            case 403:
                //移除token
                localStorage.removeItem('token');
                break;
            case 404:break;
        }
    }else{
        //没有错误信息，就是断网
        if(!window.navigator.onLine){
            //断网
            return;
        }else{
            return Promise.reject(error);
        }
    }

});

export default axios;
//相当于重构了axios