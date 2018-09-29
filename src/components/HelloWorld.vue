<template>
  <div class="hello text-center">
    <h1>{{ msg }}</h1>
    <button @click="show">alert</button><button @click="show1">confirm</button>
    <button @click="loading">loading</button>
    <button @click="loading_close">close</button>


    <button @click="smsBox">SMSbox</button>
    
    <div class="smsBox">
      <div class="sms_panner">
        <span class="sms_close">X</span>
        <div class="header" style="height:40%">
          <p>请输入验证码</p>
          <p>已发送至手机号189 0000 0008</p>
        </div>
        <div class="conent" style="height:30%">
          <input type="tel" maxlength="6" class="realInput" id="focusId"/>
        </div>
        <div class="footer" style="height:30%">
          <div class="sms_btn">重新发送</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import puhui from "@/utils/index";
import "@/utils/utils.css";
import func from './vue-temp/vue-editor-bridge';
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {},
  methods: {
    show() {
      puhui.dialog("ddddd", "sasdf").then(action => {
        if (action) {
          alert(2);
        } else {
          alert(1);
        }
      });
    },
    smsBox() {
      console.log();
    },
    calback(ddd){
      console.log(11)
    },
    show1() {
      puhui.toast("ok");
    },
    loading() {
      puhui.loading.open();
    },
    loading_close() {
      puhui.loading.close();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.smsBox{
  background: rgba(0,0,0,.5);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2000;
  display: flex;
   
    justify-content: center;
    align-items: center;
}
.sms_close{
  color: #ddd;
    font-size: 15px;
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 5px;
    font-weight: 100;
}
.sms_panner {
  border-radius: 10px;
  background: #fff;
  width: 80%;
  display: inline-block;
  height: 20vh;
  position: relative;
}
.sms_panner .header p:first-child {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin: 0;
  padding-top: 10px;
}
.sms_panner .header p:last-child {
  text-align: center;
  font-size: 12px;
  color: #666;
  margin: 0;
  padding: 5px;
  font-weight: 100;
}
.sms_panner .footer {
  width: 100%;
  border-top: 1px solid #f3f3f3;
}
.smsBox .sms_btn{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: orangered;
}
.smsBox .conent input{
    border: 0;
    border-bottom: 1px solid #ddd;
    text-align: center;
}
.smsBox .conent{
    display: flex;
    justify-content: center;
    align-items: center;
}
.hide{
  display: none;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  li {
    display: inline-block;
    margin: 0 10px;
    a {
      color: #42b983;
    }
  }
}
</style>
