<template>
<div>
  <Address @selectAddress="selectAddress"></Address>
  <div class="orderBox">
    <h1 style="display:block;width: 100%;height: auto">商品</h1>'
    <div class="orderSpanInfo">
      <img :src="'/api'+imagesUrl" :alt="title" class="image">
      <span style="margin-left: 10px;width: 20%;">{{title}}</span>
      <span style="width: 50%;text-align: center;">数量*1</span>
      <span style="width: 50%;text-align: right;color: #ff8d3b">{{proInfo.price}}元</span>
    </div>
    <div style="display:flex;align-items: center;margin-top: 10px;width: 100%">
      <h1>配送方式</h1>
      <span v-if="proInfo.price>=150" style="font-size: 18px;margin-left: 100px;color: #ff8d3b">包邮</span>
      <span v-else style="font-size: 18px;margin-left: 100px;color: #ff8d3b">不包邮</span>
    </div>
    <div style="display:flex;flex-wrap: wrap;align-items: center;margin-top: 100px;width: 100%">
      <div class="payInfo"><span>商品件数</span><span class="info">1件</span></div>
      <div class="payInfo"><span>商品总价</span><span class="info">{{proInfo.price}}元</span></div>
      <div class="payInfo"><span>优惠活动</span><span class="info">0元</span></div>
      <div class="payInfo"><span>运费</span><span class="info">0元</span></div>
      <div class="payInfo" style="margin-top: 30px"><span>应付总额</span><h2 class="info">{{proInfo.price}}元</h2></div>
    </div>

    <div style="display:flex;flex-wrap: wrap;align-items: center;justify-content:right;margin-top: 100px;width: 100%">
      <el-button type="primary" style="background-color: #ff8d3b;width: 150px;border: #ff8d3b 1px solid" @click="BuyIt">去结算</el-button>
    </div>
  </div>
  <service-bar ></service-bar>
</div>
</template>

<script>
import Address from "./Address.vue";
import ServiceBar from "../components/ServiceBar.vue";
export default {
  name: "OrderBuyPage",
  components: {ServiceBar, Address},
  mounted() {
    this.getProInfo()
  },
  data(){
    return{
      proInfo:'',
      title:'',
      imagesUrl:'',
      addressId:''
    }
  },
  methods:{
    selectAddress(e){
      this.addressId=e
    },
    async getProInfo() {
      let id = this.$route.params.id;
      await this.axios.get("/api/product/" + id).then(resp => {
        this.proInfo = resp.data;
        this.title = resp.data.name
        // eslint-disable-next-line no-console
        console.log(resp.data)
        this.imagesUrl=resp.data.mainImage
      })
    },
    async BuyIt(){
      if (this.addressId==''||this.$route.params.id==''){
        this.$message.warning('地址或者商品都不能为空')
        return
      }
      await  this.axios.put('/api/orders',{productId:this.$route.params.id,addressId:this.addressId}).then(resp=>{
        if (resp.status==200){
          this.$router.push('/order/1')
          this.$message.success('提交订单成功，去订单列表页面')
        }
      })
    }
  }
}
</script>

<style scoped>
.orderBox{
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  height: auto;
  margin: auto;
}
.image{
  display: block;
  width: 30px;
  height: 40px;
}
.orderSpanInfo{
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 20px;
  font-size: 20px;
  padding: 5px;
  background-color: #e7dbdb;
}
.payInfo{
  display: flex;
  justify-content: right;
  width: 100%;
  color: #ff8d3b;
  font-size: 20px;
  margin-top: 10px;
}
.info{
  display: block;
  width: 150px;
  text-align: right;
}
</style>