import axios from 'axios';
import qs from 'qs';



function Rest() { };
Rest.prototype = {
  // web请求
  webRequest(path, data, config = {}) {
    data = mergeBaseData(data)
    let setting = {
      url: path,
      method: 'post',
      baseURL:process.env.test,
      timeout: 30000,
      data:data,
      transformRequest: [function (data, headers) {
        
        return qs.stringify({ params: JSON.stringify(data) });
      }],
      headers: {
        "token": localStorage.getItem('token') ? localStorage.getItem('token') : '',
        // 'Content-Type':'application/x-www-form-urlencoded'
      }
    };
    return doAxios(Object.assign(setting, config))
  }
};

// 请求主体
function doAxios(setting) {
  return new Promise((resolve, reject) => {
    axios(setting).then(res => {
      if(res.code===200){
        resolve(res.data)
      }else{
        console.warn(res);
      }  
    }).catch(e => {
      reject(e)
    })
  })
};
// 合并参数
function mergeBaseData(data) {
  let baseData = {
    // userid: "1"
  }
  return Object.assign({}, data, baseData);
}


const rest = new Rest;

export default rest;
