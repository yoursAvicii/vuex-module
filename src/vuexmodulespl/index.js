var myvuex = {
  install: function(vue) {
    vue.mixin({
      // created下vue实例已经生成了
      beforeCreate: function() {
        if (this.$options.isVuex) {
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
