import axios from 'axios';
import dealError  from '../main';
import {stringify} from 'query-string';


const ainfo = localStorage.getItem('access-token');
if(ainfo){
  axios.defaults.headers.common['access-token'] = ainfo;
}

axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});


axios.interceptors.response.use(function (response) {
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
axios.form = data => {
  return stringify(data,{arrayFormat: 'bracket'});
}


export default axios
