//配置请求的单例模式---全局只能有1个实例对象
//get缓存--有缓存用缓存的数据，若没有则请求
import axios from './axios.js';

// 不缓存接口地址白名单
const whiteList = ['/banner/list', '/admin/list']

class Xhr {
  // 单例模式

  //注意,ES6的class根本没有instance默认属性或者方法
  //这里的this.instance只是自定义属性名

  //总结，在class中，凡是有static前缀的，就是类专属静态方法,只能由类本身调用，而不能由类实例调用
  //且类静态方法内生成的属性，也是类静态属性，只有类本身可以访问该属性，类的实例访问不到
  //对于复杂数据类型，其变量存储的是其内存地址，所以如果return 变量，那么返回的会是和原来一模一样的对象
  //但是 return {}或者 return [],因为其是具体的模板，所以每次获得return内容的变量都会分配不同的地址，这就是template为何要在return{}中定义变量
  
  
  //保证了Class只有唯一的实例，当然，必须是通过getInstance创建
  static getInstance() {
    if (!this.instance) {
        //没有实例则新建实例
      this.instance = new Xhr()
    }
    return this.instance
  }

  // 设置请求缓存
  constructor() {
    //Map是一个数据类型，存放缓存，cache是自己定义的名字，表示缓存
    this.cache = new Map()

    //使用constructor来实现唯一实例也是可行的，需要一个静态变量来记录实例
    //当new class时，如果已经存在，直接return,就不会有新的class了
  }

  /**
   * 请求方法： 
   *  get类型options携带params参数作为数据对象， 
   *  post类型options携带data参数作为数据对象
   */
  request(options) {
    // 对get请求做一层缓存，允许post请求添加相同的数据
    const {
      method,
      url,
      params
    } = options
    let accessKey = url
    // 如果是get请求且有参数，要换缓存到参数，
    // 否则所有该url的请求都返回同一数据
    // post 请求是添加数据不需要缓存
    if (method === 'get' && params) {
      for (let key in params) {
        accessKey += key + params[key]
      }
    }

    // 这里借鉴了vue源码的watcher
    if (this.cache.has(accessKey)) {
      return Promise.resolve(this.cache.get(accessKey))
    }
    
    return axios(options).then((res) => {
      if (method === 'get' && whiteList.indexOf(url) === -1) {
        //accessKey键名，res是键值（Map对象）
        this.cache.set(accessKey, res)
      }
      return res
    })
  }
}
export default Xhr.getInstance()