<template>
    <!--左边-->
    <el-container class="container">
      <el-aside :width="CWidth">
        <div class="top">
            <img src="../../images/ruozhi.png" alt="若治"> <div>若治管理后台</div>
        </div>
        <!--最外层这个是必须要有的-->
        <!-- <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item
      ><a href="/">promotion management</a></el-breadcrumb-item
    >
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb> -->
        <el-menu>
            <el-breadcrumb separator="/">
                
            <el-menu-item index="1">  <el-breadcrumb-item :to="{ name:'default' }">首页</el-breadcrumb-item></el-menu-item>
            
            <el-sub-menu index="2" :to="{ name:'default'}">
                <template #title>
            <el-icon><location /></el-icon>
            <span>账号管理
              <el-breadcrumb-item :to="{ name:'default' }"></el-breadcrumb-item>
            </span>
           
          </template>
                <!--这个group主要是用于分组，添加分组标签-->
              <!-- <el-menu-group index="2-1">
                
              </el-menu-group> -->
              <el-menu-item index="2-1">  <el-breadcrumb-item :to="{ name:'showmanager' }">管理员列表</el-breadcrumb-item></el-menu-item>
              <el-menu-item index="2-2"> 列表项2 </el-menu-item>
             </el-sub-menu>
              
            <el-sub-menu index="3">
                <template #title>
            <el-icon><location /></el-icon>
            <span>第三大项</span>
          </template>
                <!--这个group主要是用于分组，添加分组标签-->
              <!-- <el-menu-group index="2-1">
                
              </el-menu-group> -->
              <el-menu-item index="3-1"> 列表项1</el-menu-item>
              <el-menu-item index="3-2"> 列表项2 </el-menu-item>
             </el-sub-menu>
            </el-breadcrumb>
    </el-menu>
       <!-- <el-sub-menu > -->
        <!-- <el-menu-item-group title="Group One">
           
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group> -->
       <!-- </el-sub-menu> -->
            <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu> -->
   

      </el-aside>



      <!--header部分-->
      <el-container>
        <el-header>

            <div class="left">
                 <!--注意，所有非官方的标签说白了就是组件，可以用component is：来选择-->
                 <!--一个事件可以让自己的组件的内容在事件方法中更新，但是不能更新其他组件的内容-->
                 <!--所以实现vuex参与的响应式，使用computed监听vuex中的内容是方法之一-->
                 <!--有一个原理一样得实现方法，就是在computed中直接定义一个属性，return vuex的内容-->
                 <!--简写方法为在computed选项中 ...MapState('属性名')-->

                 <!--这里是自己组件更新自己组件，this即可获取并更新data内容-->

                
                 <!--组件样式根据状态来切换，最重要的是先状态后样式的思想，先切换状态，然后根据状态改变样式，可让逻辑简单明了很多-->
                <el-icon  @click="ifExpand=!ifExpand" >
                    <component :is="CIcon"></component>
                </el-icon>
                 
                
                <!-- <button  @click="ifExpand=!ifExpand" >
                    <component :is="CIcon"></component>
                </button> -->
                <div class="right">
                    <img :src="squareUrl" alt="">
                    <p>欢迎你：{{UserInfo.adminname}}</p>
                 
                </div>
              
            </div>
        </el-header>
        <el-main> <router-view></router-view></el-main>
      </el-container>
    </el-container>

</template>
 


<script >
import { Expand, Fold,Location } from '@element-plus/icons-vue';
import { computed } from '@vue/reactivity';
import { mapMutations, mapState } from 'vuex';
import {
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'

export default {
    data()
    {
        return{
            ifExpand:true,
            CIcon:computed(()=>this.ifExpand?'Fold':'Expand'),
            CWidth:computed(()=>this.ifExpand?'150px':'50px'),
            //弊端就是用不了mapstate
            UserInfo:computed(()=>this.$store.state.userInfo),
            squareUrl:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
        
                
        }
    },
    methods:
    {
        changeShow()
        {
            this.ifshow=!this.ifshow;
        }
    },
 

    components:{Expand, Fold,Location,Document,IconMenu,Setting},
    mounted() {
        console.log(this.CIcon);
        console.log(this.CWidth);
       
        
    },
}
</script>

<style lang="scss">
   *{margin: 0;padding: 0;}
   //通配选择器并不能改变el-plus的默认标签
html,body,#app{height: 100%;

};


.container
    {
        height: 100%;
        .el-aside
    {   
        overflow: hidden;
        //width:v-bind(CWidth)
        //sass的编程式写法
        transition:all 0.5s;
        background-color: rgba(0, 0, 0, 0.719);    
        padding: 5px;
        .top
        {   height: 30px;
            width: 150px;
            img
            {   
                float: left;
                width: 30px;
                height: 30px;
                margin-left: 5px;
                
            }
            div
            {   
                margin-right: 10px;
                height: 30px;
                line-height: 30px;
                float: right;
                color: white;
                font-weight: 800;
            }
        }  
    }}
    .el-header{
        height: 50px;
        background-color:whitesmoke;
       padding: 0;
    .left{
       height: 100%;
      
       .el-icon
       {
       
        height: 20px;
        width:20px;
        margin-top: 15px;
    
       }
       .right
       { 
        height: 100%;
        float: right;
        p
        {
            float:right;
            margin-top: 20px;
            font-size: 10px;
        }
        img{
            height: 20px;
            margin-top: 17px;
            float:right;}
       }
    }
  

 
    }
  


</style>