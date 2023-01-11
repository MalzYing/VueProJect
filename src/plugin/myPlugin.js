//引入组件--提示信息
import { ElMessage } from 'element-plus'
//添加给vue全局--之后每个组件都能用
export default {
  //intall是固定的方法
  install(app) {
    //添加全局属性$message
    // app.config.globalProperties是固定的写法
    app.config.globalProperties.$message = ElMessage
  }
}
