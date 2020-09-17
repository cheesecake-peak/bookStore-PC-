<template>
  <div class="homePage">
   <div class="topStyle">
     <top></top>
   </div>
   <div class="leftStyle" :class={Width5:widtth}>
     <leftSlider @chage="channe"></leftSlider>
   </div>
   <div class="homeStyle" :class={Width95:widtth}>
     <router-view></router-view>
   </div>
  </div>
</template>

<script>
import top  from './top';
import leftSlider  from './leftSlider';
export default {
  components:{
    top,
    leftSlider ,
  },
  data () {
    return {
      widtth:false
    }
  },
  methods:{
    channe(val){
    this.widtth=val
    }
  }
}
</script>


<style scoped>
.Width5{
  width: 5% !important;
}
.Width95{
  width: 93% !important;
}
.homePage{
  width: 100%;
  height: 100%;
}
.topStyle{
  position:relative;
  width: 100%;
  top:0;
  height: 60px;
}
.leftStyle{
  width: 16%;
  height: calc(100% - 60px);
  position: relative;
  float: left;
}
.homeStyle{
  width: 82%;
  height: calc(98% - 88px);
  position: relative;
  overflow: auto;
  float: left;
  background: #ececec;
  padding: 1%;
}
</style>
