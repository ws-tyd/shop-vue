<template>
  <div class="footer">
    <div class="footer-logo">
      <!-- <img src="../assets/images/eshop.png"> -->
      <p>ESHOP</p>
    </div>             
    <div class="footer-link">
        <a href="javascript:;" >帮助中心</a><span>|</span>
        <a href="javascript:;" >服务支持</a><span>|</span>
        <a href="javascript:;" >线下门店</a><span>|</span>
        <a href="javascript:;" >关于ESHOP</a>
    </div>
    <div class="copyright">Copyright ©2021 <span class="domain">eshop.com</span> All Rights Reserved.</div>
  </div>
</template>
<script>
  export default{
    name:'nav-footer'
  }
</script>
<style lang="scss" scoped>
  .footer{
    height:234px;
    border-top:4px solid #FF6600;
    background-color:#333333;
    color:#999999;
    font-size:16px;
    text-align:center;
    .footer-logo{
      margin-top:46px;
      margin-bottom:31px;
      /* img{
        width:50px;
        height:50px;
        margin-bottom:13px;
      } */
    }
    .footer-link{
      a{
        color:#999999;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
      margin-bottom:13px;
    }
    .copyright{
      .domain{
        color:#FF6600;
      }
    }
  }
</style>