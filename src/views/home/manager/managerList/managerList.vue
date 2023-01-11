<template>
  我是管理员列表
  <!--可以想象这其实是使用了 v-for,我们使用这种模板只是因为已经设置好了默认样式，而且可以更方便的通过属性更改样式-->
  <el-table :data="managerlist" style="width: 100%">
    <el-table-column type="index" label="序号" width="180" />
    <el-table-column prop="adminname" label="账号"  />
    <el-table-column prop="role" label="权限"  
    :filters="[
        { text: '管理员', value: 1 },
        { text: '超级管理员', value: 2 },
      ]"
      :filter-method="filterTag"
    >
         <template #default="scope">
            <!--el-tag，但是只用了两个type,或许可以自定义type-->
            <el-tag
          :type="scope.row.role  ==4 ? '' : 'success'"
         
          disable-transitions
          >{{ scope.row.role =='4'?'超级管理员':'管理员' }}</el-tag
        >

         </template>
        </el-table-column>
    
       <el-table-column   >
        <template #header>
                &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;操作
        </template>
        <template #default="scope">
        <el-button  @click="showDrawer('更新',scope.row)">Edit</el-button>
        <el-button  style="background-color:indianred ;color:whitesmoke">Delete</el-button>
        </template>
    </el-table-column>
  </el-table>

  <!--抽屉,想写在哪都行，不影响，因为是相对视窗定位的-->
  <el-drawer  ref="drawer"
    v-model="drawer"
 
    :direction="rtl"
  >
  <template #title>
    <div>
       <strong>{{this.method+'管理员数据'}}</strong>
    <el-form :model="this.user" label-width="120px">
    <el-form-item >
        <template #label >
            <div class="label1">
                账号
            </div>
        </template>
      <el-input v-model="user.adminname" />
    </el-form-item>
    <el-form-item label="密码" class="label1">
        <template>
            <div>
                密码
            </div>
        </template>
      <el-input type="password"  v-model="user.password" />
    </el-form-item>
    <el-form-item >
        <template #label >
            <div class="label1">
                角色
            </div>
        </template>
     <el-select v-model="user.role">
        <el-option value=1 label="1"></el-option>
        <el-option value=2 label="2"></el-option>
        <el-option value=3 label="3"></el-option>
        <el-option value=4 label="4"></el-option>
     </el-select>
     </el-form-item>
     

     

     <el-form-item >
        <template #label class="label1">
            <div >
                权限
            </div>
        </template>
        <el-checkbox style="display:none"></el-checkbox>
        <div class="custom-tree-node-container">
          
    <el-tree
      ref="mytree" 
          :data="myroutes"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    />
   
  </div>
     
    </el-form-item>
    </el-form> 
    </div>
    </template>
    <div class="buttonbox">
    <button @click="update">{{ this.method }}</button>    <button @click="giveup">放弃修改</button>
</div>
  </el-drawer>


</template>
 
<script>
import {deleteManager,addManager,getManagers} from '../../../../Api/manager/managerList.js';
import {routes} from '../../../../router'

export default {
data()
{
    return {
      managerlist:[],
      drawer:false,
       method:"",
       user:{},
       checkedList:[],
       check1:false,
       //要知道,树形控件本就是转为routes这样存在label标签的数据而生，绑定的数据必须是含有label的对象集合
      myroutes:routes[2].children,
      //该数据为保存至存储服务器的数据模板
      content:{path:'',label:'',children:[]}
      
     
    }
},
 
methods:
{
    async getManagers()
    {
         let res=await getManagers();
         console.log(res.data.data);
        this.managerlist=res.data.data;

    },
filterTag(value, row){
  return row.role == value
},
showDrawer(method,row)
{
    this.drawer=!this.drawer,
    this.method=method,
    //这个很关键，我只是想复制一份数据,而不是在面板上直接修改
    this.user={...row}

},
update()
{
    //确定逻辑，对于每一个一级父路由，存在子路由，则父路由存在，
    //但是这种情况，仅适用于二级以下路由
        const list = this.$refs.mytree.getCheckedNodes(true);
        console.log(list);
        //直接有子节点存在则父节点存在就可以
        const fatherList=[];
    

        list.foreach((item)=>
        {      

            //只有一个结点并且选中则添加
              if(!item.children)
              {  //只要三项,不能这么写，这是复杂数据类型，要么你在作用域内新建一个，要么直接在函数参数内新建
                //  this.content.path=item.path;
                //  this.content.label=item.label;
                //  this.content.children=[];
                //除了第四项之外都是基础数据类型，可以直接赋予
                console.log(iteml.path);
                //  fatherList.push({path:item.path,label:item.label,})
              }
        })
      
    
    
}

},
  
mounted() {
   
    this.getManagers(); 
    console.log(routes);
 
    
  
},
}
</script>

<style lang="scss">
.el-drawer
{
    padding: 0;
    .el-form
    {   
        margin-top: 20px;
       
        .el-form-item
        {
           >label{
            margin-left: -50px;
        
           
           
        }
      
   
        }
    }
    .el-checkbox-group
    {
        label
        {   
            font-size: 100px;
            
        }

    }
    .buttonbox
    {
        position: absolute;
        bottom: 15px;
        right: 20px;
        button
        {
            height: 40px;
            width: 80px;
            border-radius: 10px;
        }
    }

}

</style>