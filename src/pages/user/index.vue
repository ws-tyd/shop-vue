<template>
  <div>
    <nav-header v-if="!flag"></nav-header>
    <div class="userMain">
      <el-col :span="22" :offset="1">
        <el-row style="height: 100%;">
          <el-col :span="6" class="MainTitles">
            <el-button class="MainSpan" @click="toUrl('/user')">个人信息</el-button>
            <el-button class="MainSpan" @click="toUrl('/user/money')">钱包充值</el-button>
            <el-button class="MainSpan" @click="toUrl('/user/password')">修改用户信息</el-button>
            <el-button class="MainSpan" @click="toUrl('/user/address')">地址管理</el-button>
            <el-button class="MainSpan" @click="toUrl('/')">回到首页</el-button>
          </el-col>
          <el-col :span="17" :offset="1" class="mainBox">
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-col>
    </div>
    <nav-footer  v-if="!flag" style="margin-top: 10px"></nav-footer>
  </div>
</template>

<script>
import NavHeader from "../../components/NavHeader.vue";
import NavFooter from "../../components/NavFooter.vue";

export default {
  name: "index",
  components:{
    NavHeader,
    NavFooter
  },
  data(){
    return{
      // ua:navigator.userAgent.toLowerCase(),
      flag:null
    }
  },
  methods:{
    toUrl(url){
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
.userMain{
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  width: 60%;
  height: 100%;
  margin: auto;
  border: #ffffff 1px solid;
  transition: ease-in-out .7s;
}
.userMain:hover{
  border: #cccccc 1px solid;
  box-shadow: 3px 3px 3px 1px;
}
.mainBox{
  display: flex;
  min-height: 300px;
  height: auto;
  padding: 10px;
  border: #cccccc 1px solid;
}
.MainTitles{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  overflow: hidden;
  height: 100%;
  font-size: 20px;
  font-weight: bold;
  transition: ease-in-out .5s;
}
.MainSpan{
  display: flex;
  width: 100%;
  height: 40px;
  margin: 3px;
  justify-content: center;
  align-items: center;
  background-color: #dbd1cc;
  color: black;
  cursor: pointer;
  border: #ffffff 1px solid;
  transition: ease-in-out .6s;
}
.MainSpan:hover{
  border: #545c64 1px solid;
}
.MainSpan:visited{
  background-color: cyan;
  color: white;
}
</style>