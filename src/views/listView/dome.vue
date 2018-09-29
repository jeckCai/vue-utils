<template>
  <section class="activity_detail page">
    <div>
      <button @click="smsBox">smsBox</button>
      <button @click="toast">toast</button>
      <button @click="dialog">dialog</button>
       <button @click="dialog1">dialog1</button>
        <button @click="dialog2">dialog2</button>
      <button @click="loading">loading</button>
      <button @click="prick">prick</button>
      <button @click="pickerTime">pickerTime</button>
    </div>
    <div>
      <label for="Addr" id="areaLabel" class="address">
            <span>所在地区</span>
            <input type="text" name="Addr" readonly placeholder="请选择地区" @click="isShow">
        </label>
        <!-- <div id="addressSelectWrapper" v-if="isShowDiv">
            <div id="addressSelect">
                <div class="tip">
                    <h3>选择地址</h3>
                    <button type="button" id="cancel">X</button>
                </div>
                <div id="address">
                    <ul class="selected-address">
                        <li class="lastarea" id="lastprovince">请选择</li>
                        <li class="lastarea" id="lastcity">请选择</li>
                        <li class="lastarea" id="lastarea">请选择</li>
                    </ul>
                    <div class="address-content">
                        <ul id="province">
                          <li v-for="(item,index) in result" key="index" @click="clickCity(item.children)">{{item.label}}</li>
                        </ul>
                        <ul id="city">
                          <li v-for="(item,index) in cityItem" key="index" @click="clickArea(item.children)">{{item.label}}</li>
                         
                        </ul>
                        <ul id="area">
                          <li v-for="(item,index) in AreaItem" key="index" @click="send(item)">{{item.label}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
  </section>
</template>

<script>
import P from "@/utils/index";
import "@/utils/utils.css";

export default {
  components: {},
  data() {
    return {
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
      isShowDiv: false
    };
  },
  methods: {
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
        type:1,
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
    }
  }
};
</script>

<style scoped>
</style>
