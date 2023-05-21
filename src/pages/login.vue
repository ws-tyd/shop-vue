<template>
  <div class="login">
    <div class="container">
      <a href="/#/index"><img src="/imgs/login-logo.png" alt="" style="height: 50px;margin-top: 25px;"/></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked" v-if="flag">帐号登录</span>
            <span class="checked" v-else>帐号注册</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="login" />
          </div>
          <div class="input" v-if="!flag">
            <input type="text" placeholder="请输入网名" v-model="nickname" />
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn"  v-if="flag" @click="userLogin">登录</a>
            <a href="javascript:;" class="btn" v-else @click="userRegister">注册</a>
          </div>
          <div class="tips">
            <div class="reg" @click="register()">
              <span v-if="flag">立即注册</span>
              <span v-else>立即登录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="javascript:;">帮助中心</a><span>|</span>
        <a href="javascript:;">服务支持</a><span>|</span>
        <a href="javascript:;">线下门店</a><span>|</span>
      </div>
      <div class="copyright">
        <!-- Copyright ©2021 <span class="domain"></span> All Rights Reserved. -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      flag:true,
      login: "",
      nickname:'',
      password: "",
      userId: "",
      redirect: "",
    };
  },
  mounted() {
    this.redirect = this.$route.query.redirect;
  },
  methods: {
    register() {
      this.flag=!this.flag;
    },
    async userLogin() {
      let { login, password } = this;
      await this.axios
        .post("/api/login", {
          login:login,
          password:password,
        })
        .then((res) => {
          sessionStorage.setItem("Authorization", res.data.token);
          window.localStorage.setItem("Authorization", res.data.token);
          this.$store.dispatch('saveAuthorization',res.data.token)
          this.$message.success("登录成功")
          this.$router.push(this.redirect || "/index");
        })

    },
    userRegister(){
      this.axios.post('/api/register',{login:this.login,nickname:this.nickname,password:this.password}).then(resp=>{
        this.$message.success("注册成功")
      })
    },
    ...mapActions(["saveUserName"]),
  },
};
</script>
<!--
          // sessionStorage.setItem("Authorization", res.data.Authorization);
          // sessionStorage.setItem("type", res.data.userInfo.type);
          // window.localStorage.setItem("Authorization", res.data.Authorization);
          // window.localStorage.setItem("type", res.data.userInfo.type);
          // this.$store.dispatch("saveUserName", res.data.userInfo.userName);
          // this.$store.dispatch("saveUserInfo", res.data.userInfo);
          // this.$store.commit("saveType", res.data.userInfo.type);
          // this.saveUserName(res.data.userInfo.userName);
-->
<style lang="scss" scoped>
.login {
  & > .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url("../../public/imgs/login-1.jpg");
    .container {
      height: 576px;
      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 510px;
        background-color: #ffffff;
        position: absolute;
        bottom: 29px;
        right: 0;
        h3 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
          .checked {
            color: #ff6600;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn {
          width: 100%;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;
          .sms {
            color: #ff6600;
          }
          .reg {
            color: #999999;
            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
  .footer {
    height: 100px;
    padding-top: 60px;
    color: #999999;
    font-size: 16px;
    text-align: center;
    .footer-link {
      a {
        color: #999999;
        display: inline-block;
      }
      span {
        margin: 0 10px;
      }
    }
    .copyright {
      margin-top: 13px;
    }
  }
}
</style>
