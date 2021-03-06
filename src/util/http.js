import axios from 'axios';
import router from '../router';
import {dealError} from "../main";
import {stringify} from 'query-string';

const Axios = axios.create({
  timeout: 100000,
  withCredentials: true, // 是否允许带cookie这些
  // headers: {
  //     "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  // }
});
Axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('admin-token');
    if (token) {
      config.headers['access-token'] = token;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);


Axios.interceptors.response.use(function (response) {
    if(response.status != 200){
        dealError(response.status,response.data.message);
        return Promise.reject({response});
    }
    const {data} = response;
    if(data && data.code && data.code != 200){
        dealError(data.code,data.msg || response.data.message);
        return Promise.reject({response});
    }
    return response;
}, function (e) {
    const { status,data } = e.response;
    dealError(status , data.message);
    return Promise.reject(e);
});

/**
 * 表单数据编码
 */
Axios.form = data => {
  return stringify(data,{arrayFormat: 'bracket'});
};


// // 返回状态判断(添加响应拦截器)
// Axios.interceptors.response.use(
//   res => {
//     if(res.data.code===-100||res.data.code===-99){
//       router.push({
//         path: '/'
//       })
//     }else {
//       // console.log(res)
//       return res
//     }
//
//   },
//   error => {
//     // console.log(error)
//     // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
//     // 直接丢localStorage或者sessionStorage
//     if (localStorage.getItem('token')==null) {
//       // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
//       router.push({
//         path: '/'
//       })
//     } else {
//
//       console.log(error.response)
//       if (error.response.code ===-1) {
//         router.push({
//           path: '/'
//         })
//       } else {
//         // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
//         if (error.response.status === 403) {
//           router.push({
//             path: '/error/403'
//           })
//         }
//         if (error.response.status === 500) {
//           router.push({
//             path: '/error/500'
//           })
//         }
//         if (error.response.status === 502) {
//           router.push({
//             path: '/error/502'
//           })
//         }
//         if (error.response.status === 404) {
//           router.push({
//             path: '/error/404'
//           })
//         }
//       }
//     }
//     // 返回 response 里的错误信息
//
//     return Promise.reject(error)
//   }
// );

export default Axios
