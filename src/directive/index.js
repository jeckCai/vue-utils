
import Vue from 'vue';


Vue.directive('sina-cc', {
  bind: function (el, binding) {
    
    let type = binding.modifiers;
   
    let maidian =true;
    el.addEventListener('click',()=>{
      if(type){
        for(let i in type){
          maidian=false;
        }
      }
    })
   return maidian ? console.log(1):console.log(2);
  }
});