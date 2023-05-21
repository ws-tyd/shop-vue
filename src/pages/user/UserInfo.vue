<template>
<div class="userInfoBox">
  <div class="userInfoItem">
    <el-col :span="8" class="title">用户名 :</el-col>
    <el-col :span="16" class="info">{{userInfo.userName}}</el-col>
  </div>
  <div class="userInfoItem">
    <el-col :span="8" class="title">网名 :</el-col>
    <el-col :span="16" class="info">{{userInfo.nickname}}</el-col>
  </div>
  <div class="userInfoItem">
    <el-col :span="8" class="title">电话号码 :</el-col>
    <el-col :span="16" class="info">{{userInfo.phone}}</el-col>
  </div>
  <div class="userInfoItem">
    <el-col :span="8" class="title">用户类型 :</el-col>
    <el-col :span="16" class="info">{{userInfo.type}}</el-col>
  </div>
  <div class="userInfoItem">
    <el-col :span="8" class="title">邮箱 :</el-col>
    <el-col :span="16" class="info">{{userInfo.email}}</el-col>
  </div>
  <div class="userInfoItem">
    <el-col :span="8" class="title">创建时间 :</el-col>
    <el-col :span="16" class="info">{{userInfo.createTime}}</el-col>
  </div>
  <div class="userInfoItem">
    <el-col :span="8" class="title">账号余额 :</el-col>
    <el-col :span="16" class="info">{{userInfo.balance}}</el-col>
  </div>
</div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "UserInfo",
  data(){
    return{
      user:{}
    }
  },
  mounted() {
  },
  methods:{
    getUserInfo(){
      this.axios.post('/api/userSession').then(resp=>{
        console.log(resp,1)
        this.user=resp.data
      })
    }
  },
  computed:{
    ...mapState({
      userInfo:(state)=>state.user
    })
  }
}
/**
 *
 * balance: 206
 createTime: "2022-05-04T10:07:15"
 email: "123@qq.com"
 id: 1
 nickname: "users"
 phone: "11111111111"
 type: "staff"
 userName: "admin"*/
</script>

<style scoped>
.userInfoBox{
  display: flex;
  flex-wrap: wrap;

}
.userInfoItem{
  display: flex;
  justify-content: left;
  align-content: center;
  text-align: center;
  margin: 2px;
  width: 100%;
  font-size: 20px;
}
.title{
  display: flex;
  text-align: left;
  font-weight: bold;
  overflow: hidden;
}
.info{
  text-align: left;
  overflow: hidden;
}
</style>