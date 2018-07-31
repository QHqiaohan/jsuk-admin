import Vue from 'vue';
import App from './App';
import router from './router';
// import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import Axios from './util/http.js'
import FmGrid from './components/grid/FmGrid';
import Dict from './components/system/Dict';
import Shop from '@/util/shop';
import dict from "./util/dict";


var querystring = require('qs');
Vue.use(ElementUI, {size: 'small'});
Vue.config.productionTip = false;
Axios.defaults.baseURL = '/proxy';
Vue.prototype.$axios = Axios;
Vue.prototype.$qs = querystring;
Vue.prototype.$session = {
  load() {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/adm/session')
        .then(({data: {data}}) => {
          for (const i in data) {
            Vue.prototype.$set(this, i, data[i]);
          }
          resolve();
        }).catch(reject);
    })
  }
};
Vue.prototype.$dict = new dict(Vue.prototype.$axios);
Vue.component('fm-grid', FmGrid);
Vue.component('dict', Dict);
Vue.prototype.$shop = new Shop(Axios);
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {

  // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
  if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
    Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
      confirmButtonText: '确定'
    });
  } else {
    next();
  }

});


/**
 * vue 通用选择器
 * **/
Vue.filter("toF", (value, dt) => { //默认2位小数点;
  let v = value || 0, n = dt || 2;
  return v.toFixed(n)
});

/**
 * vue 通用选择器
 * **/
Vue.filter("time", (value, dt) => { //默认2位小数点;
  let v = value||'', n = dt || 8;
  const len = v.length;
  return v.substring(len - n, len);
});

/*常用校验正则*/
const Regex = {
  phone: /0?(13|14|15|18|17)[0-9]{9}$/,
  password: /^[a-zA-Z0-9]{8,20}$/,//密码
  phoneCode: /^[\d]{6}$/, //验证码
  realName: /^[\u4e00-\u9fa5A-Za-z]{2,20}$/,// 真实姓名
  identity: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)|(^\d{14}(\d|X|x)$)/,//身份证
  bankCard: /^[\d]{12,21}$/, //银行卡
  price: /^\d{1,12}(\.\d{1,2})?$/,
  numInt: /^[\d]{1,20}$/,//整数
}


/*query to param*/
const toParams = function (s) {
  s = s || '';
  const arr = (s.split("?")[1] || s || '').split("&");
  const o = {};
  if (!arr[0]) {
    return o;
  }
  arr.forEach(function (x) {
    let ar = x.split("=");
    o[ar[0]] = ar[1]
  });
  return o;
};


/*param to query*/
const toQuery = function (pms) {
  let str = "";
  for (let i in pms) {
    if (pms[i]) {
      if (Array.isArray(pms[i])) {
        for (const j of pms[i]) {
          str += (`${i}=${j}&`);
        }
      } else {
        str += (`${i}=${pms[i]}&`);
      }
    }
  }
  return str.substr(0, str.length - 1);
};


Vue.prototype.$pub = {Regex, toParams, toQuery};


const vue = new Vue({
  router,
  render: h => h(App)
});

vue.$mount('#app');

const dealError = (code, message) => {
  switch (code) {
    case 203:
    case -100:
      vue.$message.error(message || '登录过期');
    case -99:
      vue.$router.push('/login');
      break;
    case 400:
      vue.$message.error(message || '参数错误');
      break;
    case 401:
      vue.$router.push('/noperm');
      break;
    case 500:
    default:
      vue.$message.error(message || '请求失败');
      break;
  }
};


export {
  dealError
}
