
import axios from '@/axios';
import api from '@/api';

export default {
  state: {
    user: {
      openID: "a1cdaf5e5c9d424db6f517604bac8585",
      appVersion: "1.8.5",
      userName: "周杰伦",
      appName: "不指定",
      platform: "iphone 5s(Global);iOS 11.4",
      appPackageName: "Circle",
      hospitalName: "深圳市布吉镇",
      userStatus: "1",
      userLevel: "3",
      hospitalID: "200401080009"
    },
    token: 'f7367be9b4bf424ca20d1050c8de37e6',
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_QUESTION(state, {key,value}) {
      state.answeredQuestion = value;
    }
  },

  actions: {
    getUserInfo({ commit }) {
      return (new Promise((resolve) => {
        let isOk = false;

        setTimeout(() => {
          if (!isOk) {
            resolve(false);
          }
        }, 500);

      }));
    }
  }
};
