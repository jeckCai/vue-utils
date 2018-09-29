import axios from 'axios';
import baseUrl from './apiRoot';
import store from '@/store';

const AXIOS = axios.create({
    baseURL: baseUrl,
    timeout: 6000
});

// request 拦截器
AXIOS.interceptors.request.use((config) => {
  const { openID } = store.getters.user;
  const token = store.getters.token;

  if (openID) {
    config.headers['openId'] = openID;
    config.headers['access-token'] = token;
    config.headers['appFlag'] = true;
  }

  return config;
}, (error) => {
  console.warn('request 拦截器', error);
  Promise.reject(error);
});

// response 拦截器
AXIOS.interceptors.response.use((response) => {
  let data = response.data || {};

  return data;
}, (error) => {
  console.warn('response 拦截器', error);
  return Promise.reject(error);
});

export default AXIOS;
