
import IosSelect  from 'iosselect';
import cityResult from './city';
import Clipboard from 'clipboard';


// 省份列表
const puhui={
  /**
   * optins:{
    * message:显示内容，
   * title：显示头部，
   * type:'alert,confirm,prompt',
   * isClose:显示右上角X按钮,
   * placeholder:输入框显示信息
   * }

   * puhui.dialog({}).then(rps=>{})
   */ 
  dialog: function (opts){
    return new Promise((resolve, reject) => {
      // if(!opts.type) return reject('窗体类型未传！');
      let tpl = `<div class="v-modal" style="z-index: 2000;"></div>
      <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2001;">
        <div class="puhui-msgbox" style="">
          <div class="puhui-msgbox-header">
            <span class='puhui-msgbox-close' style='display:none'>x</span>
            <div class="puhui-msgbox-title" style='display:${opts.title ? 'block':'none'}'>${opts.title}</div>
          </div> 
          <div class="puhui-msgbox-content">
            <div class="puhui-msgbox-message">${opts.message}</div> 
            <div class="puhui-msgbox-input" style="display: none;">
              <input placeholder="${opts.placeholder ? opts.placeholder:''}" type="text" style="border-bottom: 1px solid #dedede;"> 
            </div>
          </div> 
      <div class="puhui-msgbox-btns">
        <button class="puhui-msgbox-btn puhui-msgbox-cancel" style="" data-value='false'>取消</button> 
        <button class="puhui-msgbox-btn puhui-msgbox-confirm " data-value='true'>确定</button>
      </div>
      </div>
      </div>`;
      let dialog = document.createElement('div');
      dialog.innerHTML=tpl;
      dialog.id ='puhui-dialog';
      if (document.querySelector('#puhui-dialog')){
        document.querySelector('.v-modal').style='display:block';
        document.querySelector('.puhui-msgbox').style='display:block';
      }else{
        document.body.appendChild(dialog);
      }
      let _val = document.querySelector('.puhui-msgbox-input input').value;
      // 确定or取消事件 返回 true/false
      document.querySelector('.puhui-msgbox-btns').addEventListener('click',(e)=>{
        if(e && e.stopPropagation){
          e.stopPropagation();
          return resolve(callback({ active: e.target.dataset.value, value: _val}));
        }
      });
      document.querySelector('.v-modal').addEventListener('click', (event)=>{
        
        if (opts.type == 'alert') {
          return resolve(callback({ active: false, value: _val }));
        }
      });
      switch (opts.type) {
        case 'alert':
          document.querySelector('.puhui-msgbox-btns .puhui-msgbox-cancel').style = 'display:none';
          break;
        case 'prompt':
          document.querySelector('.puhui-msgbox-message').style = 'display:none';
          document.querySelector('.puhui-msgbox-input').style = 'display:block';
          break;
        default:
          break;
      };
      
      if(opts && opts.isClose){
        document.querySelector('.puhui-msgbox-close').style ='display:inline-block;';
      };
      let callback=(_status)=>{
        setTimeout(() => {
          document.body.removeChild(document.querySelector('#puhui-dialog'));
          return _status;
        }, 300);
        
      };
      document.querySelector('.puhui-msgbox-close').addEventListener('click',()=>{
        console.log(111);
        return resolve(callback('false'));
      });
    });  
  },
  /**toast
   * _msg:提示内容
   */ 
  toast:function(_msg,_time){
    if(!_msg) return ;
    let div = document.createElement('div'), span =`<span class="puhui-toast-text" style="padding-top: 0px;">${_msg}</span>`;
    div.style='padding:10px';
    div.className ='puhui-toast is-placemiddle';
    div.innerHTML=span;
    document.body.appendChild(div);
    setTimeout(() => {
      document.body.removeChild(document.querySelector('.puhui-toast'));
    }, _time?_time:1500);
  }, 
   /**
     * loading
     * _msg 显示信息 
     */

  loading:{
   
    close: function(){
      if (document.querySelector('#puhui-loading')){
        document.querySelector('#puhui-loading').style = 'display:none';
      };
    },
    addNode: function(_msg){
      let div = document.createElement('div'), mask =`<div class='puhui-indicator-mask'></div>`;
      mask +=`<div class='puhui-indicator-wrapper' style='padding:20px'>
        <span class='puhui-indicator-spin'>
          <div class='puhui-spinner-snake' style='border-top-color: rgb(204, 204, 204);border-left-color: rgb(204, 204, 204);border-bottom-color: rgb(204, 204, 204);
    height: 32px;
    width: 32px;'></div>
        </span>
        <span class='puhui-indicator-text' style='display:${_msg?'block':'none'}'>${_msg}</span>
      </div>`;
      div.className ="puhui-indicator";
      div.id='puhui-loading';
      div.innerHTML=mask;
      document.body.appendChild(div);

    },
    open: function (_msg) {
      
        if (document.querySelector('#puhui-loading')){
          if (_msg) { 
            document.querySelector('.puhui-indicator-text').style='display:block';
            document.querySelector('.puhui-indicator-text').innerText=_msg
          }else{
            document.querySelector('.puhui-indicator-text').style='display:none';
          }
          document.querySelector('#puhui-loading').style='display:block';
        }else{
          this.addNode(_msg);
        }
      
      
    },
  },
  /**
   * 
   * opts:{
   *  length:可输入长度
   *  tel:号码，
   *  count:倒计时时间，默认60
   * }
   * 
   * 
   * P.smsBox.show(optins).then(active=>P.smsBox.close());
   */ 
  smsBox:{

    show :function (opts){
      return new Promise((resolve, reject) => {
        if (!opts.tel) { return reject({ code: 500, msg: '电话不能为空' })}else{
          if (!(/^1[3,5,6,7,8,9]\d{9}$/.test(opts.tel)))return puhui.toast('号码格式不正确');
        };
        let div = document.createElement('div'), tpl = '', isSum = false;
        div.id = 'smsBox';
        div.className = 'smsBox';
        
        tpl = `<div class="puhui-sms-panner">
      <span class="puhui-sms-close">x</span>
      <div class="puhui-sms-header" style="height:40%">
        <p>请输入验证码</p>
        <p>已发送至手机号 ${setPhone(opts.tel)}</p>
      </div>
      <div class="puhui-sms-conent" style="height:30%">
        <input autofocus type="tel" maxlength="${opts.length ?opts.length:4}" class="realInput" id="focusId" />
        <p class="puhui-sms-xian"></p>
      </div>
      <div class="puhui-sms-footer" style="height:30%">
        <div class="sms_btn sms_btn_noactive">重新发送</div>
      </div>
    </div>`;
        div.innerHTML = tpl;
        document.body.appendChild(div);
        function getTime(_sum) {
          let sms_btn = document.querySelector('.sms_btn');
          
          let js = setInterval(() => {
            if (_sum == 1) {
              clearInterval(js);
              sms_btn.innerText = '重新发送';
              sms_btn.className ='sms_btn  sms_btn_active';
              isSum = true;
              return;
            }
            _sum--;
            sms_btn.innerText = '重发(' + _sum + ')秒';
          }, 1000);
        };
        setTimeout(() => {
          getTime(opts.count ? opts.count+1:61);
        }, 10);
        // 重新发送
        document.querySelector('.sms_btn').addEventListener('click', (e)=>{
          if (isSum) {
            isSum = false;
            e.target.setAttribute('class', 'sms_btn  sms_btn_noactive');
            return getTime(opts.count ? opts.count+1 : 61);
          };
        });
        // 焦点样式
        let input = document.querySelector('#focusId'), span = document.querySelector('.puhui-sms-xian');
        input.addEventListener('keyup', (e)=> {
          if (e.target.value) {
            if (e.target.value.length == opts.length) {
              // 这里应做接口验证之后再回调回去

              if (this.checkSms()){
                // 成功再返回true
                return resolve({ code: e.target.value, iphone: opts.tel, isCheck: true })
              }  
            }
          }
        });
        input.addEventListener('focus',()=>{
          span.className ='puhui-sms-xian-active';
        });
        input.addEventListener('blur',()=>{
          span.className ='puhui-sms-xian';
        });
        function setPhone(_tel){
          _tel = _tel.toString();
          let a = _tel.substring(0, 3), b = _tel.substring(3, 7), c = _tel.substring(7, 11);
          return a+' '+b+' '+c;
        };
        document.querySelector('.puhui-sms-close').addEventListener('click', () => { this.close() });
      })
    },
    close:function() {
      document.body.removeChild(document.querySelector('#smsBox'))
    },
    checkSms:function(){
      // 验证验证码，
      return true;
    },
    sendSms:function(){
      // 调用后台接口发送短信验证
    }
      
  },
  /**
   * 地址选择 
   * 数据格式[{value:id,label:name,children:[{value:id,label:name,children:[...]}]}]
   * 
   *  opts:{
   *  areaCode: "10011"
      areaName: "攸县"
      cityCode: "1001"
      cityName: "株洲"
      provinceCode: "100"
      provinceName: "湖南省"}  //回显数据
   * 
   */ 
  addrssBox:function(opts){
    let optins = opts;
    return new Promise((resolve,reject)=>{
      let tpl =`
            <div id="addressSelect">
                <div class="tip">
                    <h3>选择地址</h3>
                    <button type="button" id="cancel">&#10005</button>
                </div>
                <div id="address">
                    <ul class="selected-address">
                        <li class="lastarea" id="lastprovince" data-key="province">${optins.provinceName || '请选择'}</li>
                        <li class="lastarea" id="lastcity" data-key="city">${optins.cityName || '请选择'}</li>
                        <li class="lastarea" id="lastarea" data-key="area">请选择</li>
                    </ul>
                    <div class="address-content">
                        <ul id="province">
                          <li></li>
                        </ul>
                        <ul id="city">
                          <li></li>
                        </ul>
                        <ul id="area">
                          <li></li>
                        </ul>
                    </div>
                </div>
            </div>`,list={};
      if (!document.querySelector('#addressSelectWrapper')){
        let div = document.createElement('div');
        div.id = 'addressSelectWrapper';
        div.innerHTML = tpl;
        document.body.appendChild(div);
      };
      let province =document.querySelector('#province');
      let lastarea = document.querySelector('#lastarea');
      let lastprovince = document.querySelector('#lastprovince');
      let lastcity = document.querySelector('#lastcity');
      let cityNode = document.querySelector('#city');
      let areaNode= document.querySelector('#area')
      //初始化，获取第一级数据展示
      function init(){
        let datas = cityResult,_li='';
        datas.map(function(item,idx){
          _li += `<li data-index='${idx}' data-id='${item.id}' class='${optins.provinceCode==item.id ?'active':' '}'>${item.value}</li>`;
        })
        province.innerHTML=_li;
        province.style='display:block';
        document.querySelectorAll('#province li').forEach((item)=>{
          if (optins && optins.cityCode) {
            if(item.className=='active'){
              provinceList(item.getAttribute('data-index'), item)
            }
          }
          item.onclick=function(){
           
            provinceList(item.getAttribute('data-index'),item)
          }
        });
        if (optins.provinceCode){
          lastarea.className = 'active';
        }else{
          lastprovince.className = 'active';
        };
        
        document.querySelectorAll('.selected-address li').forEach((item)=>{
          item.onclick=function(){
           
            item.className ='lastarea';
            tipClick(item);
          }
        })
      }; 
      // 动画延时bug
      setTimeout(() => {
        init(opts);
      }, 300);
      // 省份
      function provinceList(_idx,evt){
       
        clearAction(evt);
        evt.className='active';
        lastcity.className ='active';
        lastprovince.className = '';
        lastprovince.innerText = evt.innerText;
        let datas = cityResult[_idx].children,_li='';
        datas.map((item,idx)=>{
          _li += `<li data-index="${idx}" data-id="${item.id}" class='${optins.cityCode==item.id? 'active':''}'>${item.value}</li>`;
          cityNode.innerHTML=_li;
          cityNode.style = 'display:block';
          province.style = 'display:none';
        });
        
        document.querySelectorAll('#city li').forEach((item,idx)=>{
          if (optins.cityCode){
            clearAction(lastprovince);
            if(item.className=='active'){
              city(_idx, item.getAttribute('data-index'), item);
            }
          }
          item.onclick=function(){
            city(_idx,item.getAttribute('data-index'),item);
          }
        })

      };
      //市区
      function city(_paresidx,_idx,evt){
        lastarea.className = 'active';
        lastcity.className = 'lastarea';
        clearAction(evt);
        evt.className='active';
        lastcity.innerText = evt.innerText;
        let areaList = cityResult[_paresidx].children[_idx].children,_li='';
        if (!areaList) return;
        areaList.forEach((item,idx)=>{
          _li += `<li data-index=${idx} data-id=${item.id} class="${optins.areaCode == item.id ?'active':''}">${item.value}</li>`;
          areaNode.innerHTML = _li;
          cityNode.style = 'display:none';
          areaNode.style = 'display:block';
        });
        document.querySelectorAll('#area li').forEach((item, idx) => {
          if (optins.areaCode){
            clearAction(lastprovince);
          }
          item.onclick = function () {
            area(_idx, item.getAttribute('data-index'), item);
          }
        })

      };
      // 地区
      function area(_paresidx,_idx,evt){
        clearAction(evt);
        evt.className = 'active';
        lastarea.className = 'lastarea';
        lastarea.innerText = evt.innerText;
        list = listData(evt);
        if (optins.provinceCode){
          
        }
        setTimeout(() => {
          document.body.removeChild(document.querySelector('#addressSelectWrapper'));
        }, 300);
        return resolve(list);

      };
      // 遍历，获取最终数据
      function listData(evt){
        let _list={};
        document.querySelectorAll('#province li').forEach(item => {
          if (item.className == 'active') {
            _list.provinceCode = item.getAttribute('data-id');
            _list.provinceName = item.innerText;
          }
        });
        document.querySelectorAll('#city li').forEach(item=>{
          if(item.className=='active'){
            _list.cityCode = item.getAttribute('data-id');
            _list.cityName = item.innerText;
          }
        });
        _list.areaCode = evt.getAttribute('data-id');
        _list.areaName=evt.innerText;
        return _list;
      };
      // title 点击事件
      function tipClick(evt){
        clearAction(evt);
        evt.className ='active';
        document.querySelectorAll('.address-content ul').forEach(item => {
          item.style = 'display:none';
          if (item.id == evt.getAttribute('data-key')) {
            item.style = 'display:block';
          }
        })
      };
      // 清除选择样式
      function clearAction(evt){
        let node = evt.parentNode;
        if(node.childNodes.length>0){
          for(let i=0;i<node.childNodes.length;i++){
            node.childNodes[i].className='';
          }
        }
      };
      //关闭按钮
      document.querySelector('#cancel').onclick=function(){
        document.body.removeChild(document.querySelector('#addressSelectWrapper'))
      };
      // 蒙层关闭
      document.querySelector('#addressSelectWrapper').onclick=function(event){
        if (event && event.stopPropagation ){
          event.stopPropagation();
          if (event.target.id =='addressSelectWrapper'){
            document.body.removeChild(event.target);
          }
          
        }
      };
    })
  },
  /**
   * 
   * optins:{
   *  _type:1 是普通选择 2:联动选择，
   *  _data1:[{id:id,value:value,parentId:parentId:0}];
   *  _data2:[{id:id,value:value,parentId:parentId}:data1.id];
   *  _data3:[{id:id,value:value,parentId:parentId:data2.id}]
   *  _leve:层级数默认1,2,3,
   *  listData:{}  回显数据
   * }
  
   */ 
  picker:function(optins){    
    let opt = optins, list = [], _echo = {};
    opt.leve == 2 ? list = [opt.data1, opt.data2] : opt.leve == 3 ? list = [opt.data1, opt.data2, opt.data3] : list = [opt.data1];
    if(optins.listData){
      _echo =optins.listData;
    };
    return  selectPicker();
    function selectPicker(){
      return new Promise(resolve=>{
        new IosSelect(optins.leve, list, {
          itemHeight: 50,
          itemShowCount: 5,
          showAnimate: true,
          oneLevelId: _echo.oneLeveId,
          twoLevelId: _echo.twoLeveId,
          threeLevelId: _echo.threeLeveId,
          relation: opt.type==2?[1,1]:0,
          callback: function (...x) {
            let opts = _echo;
            x.forEach((item, idx) => {
              switch (idx) {
                case 0:
                  opts.oneLeveId = item.id;
                  opts.oneLeveName = item.value;
                  break;
                case 1:
                  opts.twoLeveId = item.id;
                  opts.twoLeveName = item.value;
                  break;
                case 2:
                  opts.threeLeveId = item.id;
                  opts.threeLeveName = item.value;
                  break;
                default:
                  break;
              }
            });
            resolve(opts);
          }
        });
      }) 
    };
  },
  /**
   * 时间选择，获取本地时间
   */ 
  pickerTime:function(){
    // 初始化时间
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDate = now.getDate();
    // 数据初始化year往前后推5年
    function formatYear(nowYear) {
      var arr = [];
      for (var i = nowYear - 5; i <= nowYear + 5; i++) {
        arr.push({
          id: i + '',
          value: i + '年'
        });
      }
      return arr;
    }
    function formatMonth() {
      var arr = [];
      for (var i = 1; i <= 12; i++) {
        arr.push({
          id: i + '',
          value: i + '月'
        });
      }
      return arr;
    }
    function formatDate(count) {
      var arr = [];
      for (var i = 1; i <= count; i++) {
        arr.push({
          id: i + '',
          value: i + '日'
        });
      }
      return arr;
    }
    var yearData = function (callback) {
      
      callback(formatYear(nowYear))
     
    }
    var monthData = function (year, callback) {
      
      callback(formatMonth());
      
    };
    var dateData = function (year, month, callback) {
     
      if (/^(1|3|5|7|8|10|12)$/.test(month)) {
        callback(formatDate(31));
      }
      else if (/^(4|6|9|11)$/.test(month)) {
        callback(formatDate(30));
      }
      else if (/^2$/.test(month)) {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
          callback(formatDate(29));
        }
        else {
          callback(formatDate(28));
        }
      }
      else {
        throw new Error('month is illegal');
      }
    };
    
    return new Promise((resolve,reject)=>{
      var iosSelect = new IosSelect(3,
        [yearData, monthData, dateData],
        {
          title: '地址选择',
          itemHeight: 35,
          showLoading: true,
          callback: function (year,month,day) {
            let time = year.id+'-'+month.id+'-'+day.id;
            resolve({ date: Date.parse(time),time:time});
          }
        });
    })
  },
  /**
   * 下载，通过HTML5 download属性
   * opts.url,
   * opts.id
   */ 
  AdownLoad:function(opts){
   return new Promise((resolve,reject)=>{
     var aLink = document.createElement("a");
     aLink.download = '';
     aLink.href = opts.url;
     let isSupportDownload = 'download' in document.createElement('a');
     if (isSupportDownload){
       if (document.createEvent) {
         var e = document.createEvent('MouseEvents');
         e.initEvent('click', true, true);
         aLink.dispatchEvent(e);
         resolve(true)
       } else if (aLink.fireEvent) {
         aLink.fireEvent('onclick');
         resolve(true)
       } else {
         reject('不支持下载')
       }
     }else{
       return this.toast('系统不支持,请长按保存！');
     }
    
   }) 
  },
  /**
   * 剪切板
   * data:需要复制的数据
   */ 
  copyBoard:function(data){
    if(!document.querySelector('#copyBtn')){
      let div = `<button id="copyBtn"></button>`;
      let aCopy = document.createElement('div');
      aCopy.id = 'copyboard';
      aCopy.style = 'display:none';
      aCopy.innerHTML = div;
      document.body.appendChild(aCopy);
    }
    let btnLink=document.querySelector('#copyBtn');
    let copy = new Clipboard('#copyBtn', {
      text: function () {
        return data
      }
    });
    function remove(){
      document.body.removeChild(document.getElementById('copyboard'));
    };
    function ready(){
      if (document.createEvent) {
        var e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        btnLink.dispatchEvent(e);
        remove();
      } else if (btnLink.fireEvent) {
        btnLink.fireEvent('onclick');
        remove();
      };
    };
    // 延时处理合成事件触发bug
    setTimeout(() => {
      ready();
    }, 300);
    return new Promise((resolve,reject)=>{
      copy.on('success', e => {
        this.toast('复制成功！')
        resolve(true);
      });
      copy.on('error', e => {
        reject('复制失败');
      });
    })
    
    
  },
  /**
   * 系统拍照
   */ 
  camearVideo:function(callback){
    let div = document.createElement('div'), a = `<span class='videoClose'>X</span><label class="ui-upload">选择媒体<input type="file" id="take-picture" accept="video/*" style="display:none"></label> <img src="about:blank" alt="" id="show-picture">`;
    div.id='picture_div';
    div.innerHTML=a;
    document.body.appendChild(div);
    document.querySelector('.videoClose').addEventListener('click', function (event) {
      document.body.removeChild(document.querySelector('#picture_div'));
    });
    
      setTimeout(function(){
        (function () {
          let takePicture = document.querySelector("#take-picture"),
            showPicture = document.querySelector("#show-picture");

          if (takePicture && showPicture) {
            if (document.createEvent) {
              var e = document.createEvent('MouseEvents');
              e.initEvent('onchange', true, true);
              takePicture.dispatchEvent(e);
              
            } else if (takePicture.fireEvent) {
              takePicture.fireEvent('onchange');
            
            };
            takePicture.addEventListener('change',(event)=>{
                let files = event.target.files,
                  file;
                if (files && files.length > 0) {
                  file = files[0];
                  try {
                    let URL = window.URL || window.webkitURL;
                    let imgURL = URL.createObjectURL(file);

                    // img图片显示imgURL也可以用一个video来显示
                    showPicture.src = imgURL;
                    callback({file:file,src:imgURL});
                    // 加载完销毁
                    showPicture.onload = function () {
                      URL.revokeObjectURL(imgURL);
                    };
                  }
                  catch (e) {
                    try {
                      // 不支持 createObjectURL
                      var fileReader = new FileReader();
                      fileReader.onload = function (event) {
                        showPicture.src = event.target.result;
                      };
                      fileReader.readAsDataURL(file);
                    }
                    catch (e) {
                      console.log('浏览器不支持！');
                      reject('浏览器不支持！')
                    }
                  }
                }
            })
          };
        })();
      },300)
  }
};

;(function(){
  window.puhui = puhui;
})();




export default puhui;
