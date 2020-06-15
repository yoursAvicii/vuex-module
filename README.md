## 说明

这是一个解决大型项目中，vuex数据臃肿庞大导致的性能问题。对vuex进行模块化并执行懒加载模式

## 文件目录说明

```
|--src
|--|--assets            样式文件
|--|--components        组件目录
|--|--router            路由目录
|--|--store             vuex目录
|--|--views             视图目录
|--|--vuexmodulespl     怎么实现vuex懒加载的js(重要)
|--|--App.vue           
|--|--main.js 
```



## vuexmodulespl目录中的js说明

```javascript
var myvuex = {
//install一个方法，使其在vue中注册使用
  install: function(vue) {
  //mixin全局混入我们的定义，在beforeCreate钩子中调用
    vue.mixin({
      // created下vue实例已经生成了
      beforeCreate: function() {
      //判断当前组件、视图下是否需要加载我们的vuex
        if (this.$options.isVuex) {
        //加载逻辑处理
          var name = this.$options.name;
          let moduleObj = this.$store._modules.root._children;
          let onoff = true;
          Object.keys(moduleObj).forEach(function(key) {
            if (key === name) {
              onoff = false;
            }
          });
          //避免重复注册
          if (onoff) {
            // 动态引入 res就是我们import的文件中暴露出来的
            let res = require("../store/module/" + name);
            // vuex提供的api，动态注册
            this.$store.registerModule(this.$options.name, res.default);
          }
        }
      },
    });
  },
};
module.exports = myvuex;
```



## mian.js中去引入

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//在这里use我们的工具
import vuexmodulespl from './vuexmodulespl'
Vue.use(vuexmodulespl);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
```

## module.vue视图中的定义

```vue
<template>
    <div>   
        模块一{{myname}}
    </div>
</template>
<script>
export default {
    name:"module1",
    isVuex:true,
    data(){
        return{
            myname:''
        }
    },
    created(){
        console.log(2);
        try{
            console.log(this.$store.state);
            this.myname = this.$store.state.module1.name;
        }catch{
            console.log('还未获取')
        }
        
    },
    
}
</script>
```

