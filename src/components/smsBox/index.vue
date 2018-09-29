<template>
  <div class="phonenum-show">
     <div class="getback-title">收回剩余礼金 
        <span @click="getbackMoneyclock()">X</span>
     </div>
    
  </div>
</template>
<script>
export default {
    name: 'packetMessage',
    data(){
       return{
        messagepacket:false,
        packets:[
        
        ],
        disInputs:[{value:''},{value:''},{value:''},{value:''},{value:''},{value:''}],
        realInput:''
        
       }
    },
    methods:{
        getbackMoney(){
          this.messagepacket=true;
          var idObj = document.getElementById('focusid');
          idObj.focus(); 
          //点击进来自动获取焦点
        },
        getbackMoneyclock(){
          this.messagepacket=false
        },
        getNum(){
          for(var i=0;i<this.realInput.length;i++){
             this.disInputs[i].value=this.realInput.charAt(i)
             // 表示字符串中某个位置的数字，即字符在字符串中的下标。
          }
        },
        delNum(){
          var oEvent = window.event; 
          if (oEvent.keyCode == 8) { 
            if(this.realInput.length>0){
             this.disInputs[this.realInput.length-1].value=''
            }
          }
        }
    },
}
</script>
<style scoped>
  .phonenum-show{padding:10px;background: #fff;}
  .getback-title{padding-bottom:10px;border-bottom: 1px solid #dddddd;position: relative;font-size: 14px;margin-bottom: 10px;}
  .getback-title span{position: absolute;right:0;top:3px;width:15px;height:15px;display: inline-block;}
  .write-phonenum p{text-align: center;font-size: 12px;}
  .write-phonenum p span{color: #3b90d1;}
  .write-input {border:1px solid #888888;width:186px;margin:10px auto;}
  .write-input li{float: left;width:30px;height: 30px;border-right:1px solid #ddd;}
  .write-input li input{-webkit-appearance: none;-moz-appearance: none;-ms-appearance: none;resize: none;outline: none;border:0;width:30px;line-height: 30px;text-align: center;height: 30px;font-size:16px;}
  .write-input li:last-child{border-right: none;}
  .write-phonenum .mint-button--default{background: #3b90d1;color:#fff;font-family: "微软雅黑";font-size: 14px;width:80%;margin:10px auto;}
  .realInput{-webkit-appearance: none;-moz-appearance: none;-ms-appearance: none;resize: none;outline: none;border:0;z-index: 1;position: absolute;width:186px;height: 32px;line-height: 32px;background: none;display: block;left:50%;margin-left: -93px;top:76px;opacity: 0;font-size:0px;caret-color:#fff;color:#000;text-indent: -5em;}
/*影藏input标签*/
  input[type="tel"]:disabled{background-color: #fff;}
</style>


