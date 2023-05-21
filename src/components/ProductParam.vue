<template>
  <div class="nav-bar" :class="{'is_fixed':isFixed}">
    <div class="container">
      <div class="pro-title">
        {{ title }}
      </div>
      <div class="pro-param">
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
    <div class="containerBox">
      <div class="imgBox">
        <el-carousel class="elCarBox"
           v-if="images.length"
        >
          <el-carousel-item v-for="(item,index) in this.images" :key="index" >
            <el-image :src="'/api'+item" alt="item" fit="cover" style="display: flex;width: 100%;height: 100%"/>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="proInfoBox">
        <div class="proInfo">
          <h1 >{{ title }}</h1>
          <span >{{ proInfo.subTitle }}</span>
        </div>
        <div class="proInfo">
          <h1 style="margin-bottom: 0px;color: #ff8d3b">店铺自营</h1>
          <span style="margin-top: 10px;color: #ff8d3b;font-size: 20px">{{ proInfo.price }}元</span>
        </div>
        <div class="proStoreBox">
          <h1 style="margin-bottom: 0px;color: #ff8d3b">库存数量: {{ proInfo.stock }}</h1>
        </div>
        <div class="proBox2">
          <div>
            <span>{{ title }}</span>
            <span>{{ proInfo.price }}</span>
          </div>
          <span >总价{{ proInfo.price }}元</span>
        </div>
        <el-button type="info" style="background-color: white;color:#ff8d3b;border:#ff8d3b 1px solid" @click="toUrl('/order/'+proInfo.id)">立即购买</el-button>
        <el-button type="info" style="background-color: white;color:#ff8d3b;border:#ff8d3b 1px solid" @click="addCart(proInfo.id)">添加到购物车</el-button>
        <el-button type="info" style="background-color: white;color:#ff8d3b;border:#ff8d3b 1px solid" @click="addCollection(proInfo.id)">添加到收藏</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'nav-bar',
  data() {
    return {
      proInfo: {},
      title: '',
      images: [],
      isFixed: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.initHeight)
    this.getProInfo();
  },
  methods: {
    toUrl(url){
      this.$router.push(url)
    },
    addCollection(pid){
      this.axios.post('/api/collection/'+pid).then(()=>{
        this.$message.success('添加收藏成功');
      })
    },
    addCart(proId){
      this.axios.post('/api/cart',{proId:proId,proCount:1}).then(resp=>{
        this.$message.success('添加到购物车成功')
        window.localStorage.setItem("cartCount",resp.data.length)
        this.$store.dispatch('saveCartCount',resp.data.length)
      })
    },
    async getProInfo() {
      let id = this.$route.params.id;
      await this.axios.get("/api/product/" + id).then(resp => {
        this.proInfo = resp.data;
        this.title = resp.data.name
      })
      this.images = [];
      this.images.push(this.proInfo.mainImage);
      let subImageList = this.proInfo.subImages.split(',')
      subImageList.forEach(item => {
        this.images.push(item)
      })
    },
    initHeight() {
      // let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // this.isFixed = scrollTop > 152? true:false;
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.initHeight, false)
  },
}
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';

.nav-bar {
  height: auto;
  line-height: 70px;
  border-top: 1px solid $colorH;
  background-color: $colorG;
  z-index: 10;

  &.is_fixed {
    position: fixed;
    top: 0;
    width: 100%;
    box-shadow: 0 5px 5px $colorE;
  }

  .container {
    width: 80%;
    @include flex();

    .pro-title {
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }

    .pro-param {
      font-size: $fontJ;

      span {
        margin: 0 10px;
      }

      a {
        color: $colorC;
      }
    }
  }

  .containerBox {
    display: flex;
    width: 50%;
    margin: auto;
    .pro-title {
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }
    .imgBox {
      display: flex;
      width: 50%;
      height: 400px;
      align-items: center;
      .elCarBox {
        width: 100%;
        height: 100%;
          img {
            margin: auto;
            width: 60%;
            height: 100%;
          }
      }
    }
    .proInfoBox{
      display: block;
      width: 50%;
      .proInfo {
        margin-top: 10px;
        height: 100px;
        text-align: left;
        h1 {
          margin: 0px;
          color: #333333;
        }
        span{
          position: relative;
          top: -40px;
          text-align: center;
          margin: 0px;
        }
      }
      .proStoreBox{
        display: flex;
        border: #ff8d3b 1px solid;
        justify-content: center;
        background-color: #f6ecec;
      }
      .proBox2{
        margin-top: 10px;
        border: #ff8d3b 1px solid;
        background-color: #f6ecec;
        div{
          padding-left: 30px;
          padding-right: 30px;
          display: flex;
          justify-content: space-between;
        }
        span{
          margin-top: 10px;
          padding-left: 30px;
          padding-right: 30px;
          color: #ff8d3b;
          font-size: 20px;
        }
      }
    }
    .pro-param {
      font-size: $fontJ;

      span {
        margin: 0 10px;
      }

      a {
        color: $colorC;
      }
    }
  }
}
</style>