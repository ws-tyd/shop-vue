<template>
<div class="navTop">
  <el-breadcrumb separator=">" class="breadcrumb">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="index"  :to="{ path: item.url }">{{item.name}}}</el-breadcrumb-item>
  </el-breadcrumb>
  <div style="display: flex;">
    <span v-if="this.$store.state.type==='staff'">管理员 :</span>
    <span v-else>用户 :</span>
    <span>{{this.$store.state.userName}}</span>
  </div>
</div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "nav-top",
  mounted() {
    console.log(this.breadcrumbList)
  },
  computed:{
    ...mapState({
       breadcrumbList: (state)=>state.breadcrumbList
    })
  }
}
</script>

<style scoped>
.navTop{
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  float: right;
  font-size: 20px;
  border: #E0E0E0 1px solid;
}
.breadcrumb{
  display: flex;
  align-items: center;
  width: 90%;
  height: 100%;
  font-size: 20px;
}
</style>