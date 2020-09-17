<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  background: #eee;
}
.el-input__inner{
  width:170px;
}
.el-pagination .el-input__inner{
  width:100px;
}
.el-pagination__jump .el-input__inner{
  width:50px;
}
.er-button{
  border-radius: 2px;
}
.el-button {
  border:1px solid #6299fe !important;
  color: #6299fe;
  padding:8px 20px;
}
.el-button--primary{
  color:#fff!important;
  background-color: #6299fe !important;
  border-color:#6299fe !important;
}
.el-button--danger{
  background-color:#F56C6C !important;
  border-color:#F56C6C !important;
   color:#fff !important;
}
.el-input__inner{
  height: 30px;
  line-height: 30px;
}
.el-table thead th{
  background: #e0ebff;
  color: #5f5b5b;
}
</style>
