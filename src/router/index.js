import {createRouter, createWebHashHistory } from "vue-router";


export const routes=
[   {path:'/',redirect:'/home'},
    {path:'/login',label:"登录",name:'login',component:()=>import('../views/login/login.vue')},
    {path:"/home",label:'主页',name:'home',component:()=>import('../views/home/home.vue')
     ,children:[
        {path:"",label:"首页",name:"default",component:()=>import('../views/home/default.vue')},
        {path:"manager",label:"管理员列表",name:"showmanager",component:()=>import('../views/home/manager/managerList/managerList.vue'),
        children:[{path:"caixukun",name:"caixukun",label:"蔡徐坤"},
        {path:"wangfei",name:"wangfei",label:"王菲"},
        {path:"chenrui",name:"chenrui",label:"陈睿"}]},
       ]
   },
]

const router=createRouter({
    history:createWebHashHistory(),
    routes
    
})

//配置路由守卫，通常应用于：①未登录时进入除登录页面的其他页面直接跳转到登录页面
//②登录后进入登录页面，跳转到其他页面

router.beforeEach((to,from)=>
{    //进登录页面判断是否有token
    if(to.name=='login')
    {
        if(!!localStorage.getItem('token'))//但是感觉不加!!区别不大
        {    
            //不知道管不管用，等一下试一试
            // router.push("./")
            ElMessage('已经登录，不需要登录')
            //可以通过name的方式返回路由，等会试试其他路由返回方式
            return {name:'home'}

        }
    }
    else 
    {
        if(!localStorage.getItem('token'))
        {
            ElMessage('尚未登录，请登录');
            return {name:'login'}

        }
      
    };
    return true;
})

export default router;
