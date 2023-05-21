<template>
  <div class="head" v-if="flag">
    <div class="head-wrap">
      <i class="el-icon-arrow-left" @click="goBack"></i>
  
    </div>
      <span>首页</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
    };
  },
  mounted() {
    window.addEventListener("resize", this.isMobile);
  },
  methods: {
    //vue返回上一层
    goBack() {
      this.$router.go(-1);
    },

    isMobile() {
      if (document.body.clientWidth <= 768) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
  },
};
</script>

<style  scoped>
.head {
    display: flex;
  line-height: 40px;
  z-index: 99;
  position: fixed;
  top: 0px;
  /* text-align: center; */
  width: 100%;
  background-color: #ffffff;
  height: 40px;


}
.head>span{
    display: inline-block;
    width: 90%;
    text-align: center;
    font-size: 1.19em;
    font-weight: bold;
}

  .head-wrap{
      margin-left: 5px;
      width: 10px;
      font-size: 20px;
      /* display: flex; */
     
  }
</style>
