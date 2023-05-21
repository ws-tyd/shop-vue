<template>
<div>
  <el-form :inline="true" v-model="this.user" label-width="80px">
    <el-form-item label="用户名">
      <el-input  v-model="user.userName" :disabled="true" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="网络昵称">
      <el-input  v-model="user.nickname" placeholder="请输入网络昵称"></el-input>
    </el-form-item>
    <el-form-item label="手机号码">
      <el-input  v-model="user.phone" placeholder="请输入手机号码"></el-input>
    </el-form-item>
    <el-form-item label="邮箱号码">
      <el-input  v-model="user.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <el-form-item label="账号类型">
      <el-input  v-model="user.type" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="账号余额">
     <span>{{userInfo.balance}}</span>
    </el-form-item>
    <div style="display:flex;justify-content:center;width: 100%;">
      <el-button @click="updateInfo" style="width: 30%">提交</el-button>
    </div>
  </el-form>
</div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "updatePass",
  data(){
    return{
      user:{
        userName:'',
        nickname:'',
        email:'',
        type:'',
        balance:'',
        phone:'',
      }
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods:{
    getUserInfo() {
      this.user={userName: this.userInfo.userName,nickname: this.userInfo.nickname,email: this.userInfo.email,type: this.userInfo.type,balance: this.userInfo.balance,phone: this.userInfo.phone}
    },
    updateInfo(){
      this.$confirm('确定要修改信息',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        this.user.balance=null;
        this.user.type=null;
        this.axios.put('/api/user/'+this.userInfo.id,this.user).then(resp=>{
          console.log(resp)
          this.$message.success('修改成功')
        })
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '取消修改'
        });
      })
    }
  },
  computed:{
    ...mapState({
      userInfo:(state)=>state.user
    })
  }
}
</script>

<style scoped>

</style>