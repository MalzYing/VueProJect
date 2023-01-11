<template>

  <el-form :model="form" label-width="120px"  class="form">
  
    <el-form-item label="用户名" class="username" >
      <el-input v-model="form.adminname" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码" class="password">
      <el-input v-model="form.password" placeholder="请输入密码" />
    </el-form-item>

    <el-button type="primary" @click="onSubmit">
                    登录
                </el-button>

  </el-form>
</template>

<script lang="ts">


import { getUser } from '../../Api/user';
import { User, Lock } from '@element-plus/icons-vue';
import {mapMutations} from  'vuex';
// do not use same name with ref


export default
{
  data()
  {
    return{
      form:{
        adminname:'admin',
        password:'123456'
      },
      status:'',

    }
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
  
  async  onSubmit(){
    // axios({
    //   method:'POST',
    //   // url:'http://121.89.205.189:3000/admin/admin/login',
    //   url:'/ser/admin/admin/login',
    //   data:this.form
      
      
    // }).then(res=>{ console.log(res);
    //  }).catch(err=>{console.log(err);
    //   })
        
         
      let res=await   getUser(this.form);
      //await确实有助于代码同步编写

      if(res.data.code=='200')
      {
    
     
       
         
        //将信息存入vuex并跳转
        this.updateUserInfo(this.form)
        this.$router.push("/");

      }
      else
      { 
        console.log("登陆失败");
        
        return
      }
      
   },
   //将vuex中的方法导入


    
  },

  mounted() {
    //这个返回的是一个对象，对象内是匹配到的方法，
    //可以通过...来获取该对象的每个内容以导入methods
  let res = mapMutations(['updateUserInfo']);
   

  for (const key in res) {
   console.log(res[key]);
  }
 },
  
   
}





</script>

<style lang="scss">
body,html
{height: 100%;
background-color: gray;}
.form
{ 
  border:1px solid black;
  border-radius: 10px;
  width: 400px;
  height: 250px;
  position: absolute;
  left:calc(50% - 200px);
  top:calc(50% - 125px);
  background-color: bisque;
  .el-form-item
  {   
    
      margin-top: 40px;
      margin-right: 30px;
  }
  .el-button
  {
    margin-left: 160px;
    margin-top: 10px;
  }
}
</style>