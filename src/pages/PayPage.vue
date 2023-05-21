<template>
  <div class="Main">
    <div class="orderBox">
      <div class="headerInfo">
        <span>{{ orderInfo.createTime }}</span>
        <span style="margin-left: 10px;margin-right: 10px">|</span>
        <span>{{ orderInfo.receiveName }}</span>
        <span style="margin-left: 10px;margin-right: 10px">|</span>
        <span>订单号 :</span>
        <span>{{ orderInfo.orderNo }}</span>
        <span style="margin-left: 10px;margin-right: 10px">|</span>
        <span v-if="orderInfo.paymentType==0">在线支付</span>
        <span v-else>其他支付</span>
        <span style="width: 40%;text-align: right;">应付金额 ：{{ orderInfo.payment }}元</span>
        <span style="width: 25%;text-align: right;cursor: pointer" @click="deleteOrder(orderInfo.id)">删除</span>
      </div>
      <div class="orderSpanInfo" v-for="(details,index) in orderInfo.details" :key="index">
        <img :src="'/api'+details.mainImage" :alt="details.name" class="image" @click="toUrl('/proInfo/'+details.id)">
        <span style="margin-left: 10px;width: 20%;">{{ details.name }}</span>
        <span v-if="orderInfo.paymentType=='0'" style="width: 50%;text-align: right;color: #ff8d3b">未付款</span>
        <span v-else style="width: 50%;text-align: right;color: #ff8d3b">已付款</span>
      </div>
      <div class="orderSpanFooter">
        <div style="width: 100%;height: 100%">
          <h1>支付方式</h1>
          <div style="display: flex;justify-content: left;width: 100%;height: 100%;">
            <div :class="payType!==1?'payMethedBox':'payMethedBox selected'" @click="changePayType(1)">支付宝</div>
            <div :class="payType!==2?'payMethedBox':'payMethedBox selected'" @click="changePayType(2)">微信</div>
            <div style="display: flex;width:60%;justify-content: right">
              <el-button type="primary" :text="true" style="font-size: 20px;font-weight: bold;float: right" @click="pay()">
                确认付款
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "PayPage",
  data() {
    return {
      orderInfo: {},
      payClass:'payMethedBox',
      payType:0
    }
  },
  mounted() {
    this.getOrderInfo();
  },
  methods: {
    getOrderInfo() {
      let orderNo = this.$route.params.orderNo;
      this.axios.get('/api/orders/' + orderNo).then(resp => {
        this.orderInfo = resp.data
        console.log(resp)
      })
    },
    changePayType(payType){
      this.payType=payType;
    },
    pay(){
      this.$confirm('确认购买',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'info'
      }).then(()=>{
        this.axios.post('/api/orders/pay',{orderNo:this.$route.params.orderNo,payType:this.payType}).then(resp=>{
          this.$message.success('支付成功');
        })
      }).catch(()=>{
        this.$message.info('你取消了支付');
      })
    }
  }
}
</script>

<style scoped>
.Main {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 80%;
  height: auto;
}

.payMethedBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 15%;
  height: 80px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  border: #ffffff 2px solid;
}
.selected{
  border: #08e208 2px solid;
}
.payMethedBox:nth-child(1){
  background-size: cover;
  background-image: url("../../public/imgs/pay/icon-ali.png");
}
.payMethedBox:nth-child(2){
  background-size: cover;
  background-image: url("../../public/imgs/pay/icon-wechat.png");
}
.orderBox {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #b5a1a1;
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-top: 20px;
  margin-bottom: 20px;
}

.headerInfo {
  display: flex;
  align-items: center;
  font-size: 15px;
  padding: 5px;
  width: 100%;
  height: 40px;
}

.orderSpanInfo {
  display: flex;
  width: 100%;
  height: 100px;
  align-items: center;
  margin-top: 20px;
  font-size: 20px;
  padding: 5px;
  background-color: #fdf8f8;
}

.orderSpanFooter {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: right;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  background-color: #fdf8f8;
}

.image {
  cursor: pointer;
  display: block;
  width: 60px;
  height: 70px;
}
</style>