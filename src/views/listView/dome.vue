<template>
  <section class="activity_detail page">
    <div>
      <button @click="DdnowLoad">下载文件</button>
      <button @click="smsBox">smsBox</button>
      <button @click="toast">toast</button>
      <button @click="dialog">dialog</button>
       <button @click="dialog1">dialog1</button>
        <button @click="dialog2">dialog2</button>
      <button @click="loading">loading</button>
      <button @click="prick">prick</button>
      <button @click="pickerTime">pickerTime</button>
      <button @click="camearVideo">系统录像</button>
      <button @click="requeryFun">requery</button>
    </div>
    <button @click="copyBoard">copytest</button>

    <button v-sina-cc="url">4545454</button>
    <div>
      <label for="Addr" id="areaLabel" class="address">
        <span>所在地区</span>
        <input type="text" name="Addr" readonly placeholder="请选择地区" @click="isShow" :value="inputVlaue">
      </label>
    </div>
    <img src="./../../assets/1.jpg"  @click="imgdonwLoad" width="100%"/>
    <keyboard @doned="submit" :quota="currentIndex" :showTag="showPass" @toggle="toggleKeyBoard">a</keyboard>
  </section>

  
</template>

<script>
import P from "@/utils/index";
import "@/utils/utils.css";
import rest from '@/utils/rest';
import keyborad from '@/components/keyboder'
export default {
  components: {keyborad},
  data() {
    return {
      showPass:true,
      url:'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg',
      promotion: {},
      currentIndex: 0,
      result: [
        {
          value:'hunan',
          label:'湖南省',
          children:[
             {
               value: "chaoyang",
                label: "朝阳",
                children:[
                  {
                    value: "aaaa",
                    label: "ddddddd",
                  },
                   {
                    value: "aaaa",
                    label: "ddddddd",
                  }, {
                    value: "aaaa",
                    label: "ddddddd",
                  }
                ]
             },
             {
               value: "chaoyang",
                label: "朝阳"
             },{
               value: "chaoyang",
                label: "朝阳"
             }
          ]
        },
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "chaoyang",
              label: "朝阳"
            },
            {
              value: "haidian",
              label: "海淀"
            },
            {
              value: "changping",
              label: "昌平"
            },
            {
              value: "shunyi",
              label: "顺义"
            }
          ]
        },
        {
          value: "shanghai",
          label: "上海",
          children: [
            {
              value: "baoshan",
              label: "宝山"
            },
            {
              value: "jiading",
              label: "嘉定"
            },
            {
              value: "songjiang",
              label: "松江"
            },
            {
              value: "pudong",
              label: "浦东"
            }
          ]
        }
      ],
      _list:{},
      oldSelect:{},
      cityItem:[],
      AreaItem:[],
      inputVlaue:'',
      isShowDiv: false
    };
  },
  methods: {
    submit(){},
    toggleKeyBoard(){},
    requeryFun(){
      rest.webRequest('ddd/asa',{name:1,age:23}).then(rps=>{console.log(rps)});
      
    },
    camearVideo(){
      P.camearVideo(function(rps){console.log(rps)});
    },
    smsBox() {
      
       P.smsBox.show({
         length:5,
         tel:18556565556,
         count:10
       }).then(active=>console.log(active)).catch(err=>{console.log(err)});
    },
    loading(){
      P.loading.open();
      setTimeout(() => {
        P.loading.close();
      }, 3000);
    },
    dialog(){
    
      P.dialog({
        message:'你好中国',
        title:'bu hao ',
        isClose:true,
         type:'alert'
      }).then(rps=>{
        console.log(JSON.stringify(rps));
      });
     
    },
    dialog2(){
      P.dialog({
         message:'国庆快乐',
         title:'快乐',
         type:'prompt'
       }).then(rps=>{
        console.log(JSON.stringify(rps)+'111');
      });
    },
    dialog1(){
       P.dialog({
         message:'国庆快乐',
         title:'快乐',
         type:'confirm'
       }).then(rps=>{
        console.log(JSON.stringify(rps)+'111');
      });
    },
    isShow() {
     P.addrssBox(this.oldSelect).then(rps=>{
       console.log(rps);
       this.oldSelect = rps;
       this.inputVlaue = rps.provinceName+'/'+rps.cityName+'/'+rps.areaName;
     });
    },
    toast(){
      P.toast('hello word')
    },
    prick(){
      // P.picker().then(res=>{
      //   console.log('-----'+JSON.stringify(res));
      // });

      P.picker({
        type:2,
        leve:3,
        listData:this._list,
        data1:[{'id':1,value:'一级',parentId:0},{'id':2,value:'一级1',parentId:0}],
        data2:[{'id':101,value:'一级+二级',parentId:1},{'id':102,value:'一级+二级1',parentId:1},{'id':201,value:'一级1+二级2',parentId:2},{'id':202,value:'一级1+二级3',parentId:2}],
        data3:[{'id':10101,value:'一级+二级+三级',parentId:101},{'id':10102,value:'一级+二级+三级1',parentId:101},{'id':10103,value:'一级+二级+三级2',parentId:102},{'id':10104,value:'一级+二级+三级3',parentId:102},{'id':10104,value:'一级+二级+三级3',parentId:201}]
      }).then(rps=>{
        console.log(rps);
        this._list = rps;
      })
    },
    pickerTime(){
      P.pickerTime().then(rps=>console.log(rps));
    },
    imgdonwLoad(event){
     
      P.AdownLoad({
        url:event.target.src
      }).then(rps=>console.log(rps))
    },
    DdnowLoad(){
      P.AdownLoad({
        fileName:'aaaa',
        url:'./../../assets/1.jpg'
      })
    },
    copyBoard(){
      P.copyBoard(new Date).then(rps=>{console.log(rps)});
    }
  }
};
</script>

<style scoped>
#areaLabel {
	
	height: 40px;
	font-size: 14px;
    color: #000;
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	justify-content: center;
	border-bottom: 1px solid #aaa;
    padding-right: 1em;
    padding-left: 1em;
    position: relative;
}
#areaLabel::after {
    content: "";
    position: absolute;
    top: 50%;
    right: calc(1em + 18px / 2);
    width: 18px;
    height: 18px;
    border-width: 1px;
    border-style: solid solid none none;
    border-color: #000;
    transform: rotate(45deg) translateY(-50%);
    transform-origin: center;
}
#areaLabel span {
	width: 80px;
}
#areaLabel input {
	flex: 1;
	border: none;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
