<template>
<div>
  <div class="orderListBox">
    <div class="orderBox" v-for="(item,index) in orderList" :key="index">
      <div class="headerInfo">
        <span>{{item.createTime}}</span>
        <span style="margin-left: 10px;margin-right: 10px">|</span>
        <span>{{item.receiveName}}</span>
        <span style="margin-left: 10px;margin-right: 10px">|</span>
        <span>订单号 :</span>
        <span>{{item.orderNo}}</span>
        <span style="margin-left: 10px;margin-right: 10px">|</span>
        <span v-if="item.paymentType===0">未支付</span>
        <span v-else-if="item.paymentType===1">支付宝支付</span>
        <span v-else-if="item.paymentType===2">微信支付</span>
        <span v-else>其他支付</span>
        <span style="width: 40%;text-align: right;">应付金额 ：{{item.payment}}元</span>
        <span style="width: 25%;text-align: right;cursor: pointer" @click="deleteOrder(item.id)">删除</span>
      </div>
      <div class="orderSpanInfo" v-for="(details,index) in item.details" :key="index">
        <img :src="'/api'+details.mainImage" :alt="details.name" class="image" @click="toUrl('/proInfo/'+details.id)">
        <span style="margin-left: 10px;width: 20%;">{{details.name}}</span>
        <span v-if="item.status===0" style="width: 50%;text-align: right;color: #ff8d3b">未付款</span>
        <span v-else style="width: 50%;text-align: right;color: #ff8d3b">已付款</span>
      </div>
      <div class="orderSpanFooter">
        <el-button type="primary" :text="true" style="font-size: 20px;font-weight: bold" @click="toUrl('/payPage/'+item.orderNo)">去结算</el-button>
      </div>
    </div>
    <div v-if="orderList.length===0"  class="no-data">
        <img src="../../public/imgs/icon-no-data.png" alt="">
        <p>没有找到更多的数据了。。。。。</p>
    </div>
    <el-pagination
        background
        :page-sizes="[5,8,10,15,20]"
        :page-size="5"
        layout="sizes, prev, pager, next"
        :total="100"
        :current-page="parseInt(pageUtil.current)"
        @size-change="sizeChange"
        @current-change="currentChage"
        >
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
  name: "OrderList",
  data(){
    return{
      pageUtil:{
        current:1,
        size:5
      },
      imagesUrl:'',
      orderList:[]
    }
  },
  mounted() {
    this.pageUtil.current=this.$route.params.current
    this.getOrderList(this.pageUtil)
  },
  beforeRouteUpdate(to,from,next){
    this.getOrderList(this.pageUtil)
    next();
  },
  methods:{
    toUrl(url){
      this.$router.push(url)
    },
    sizeChange(size){
      this.pageUtil.size=size;
      this.getOrderList(this.pageUtil)
    },
    currentChage(current){
      this.pageUtil.current=current;
      this.$router.push('/orders/'+current)
    },
    async getOrderList(data){
      await this.axios.post('/api/orders',data).then(resp=>{
        this.orderList=resp.data.records;
        console.log(this.orderList)
      })
    },
    async deleteOrder(id){
      await this.axios.delete('/api/orders/'+id).then(resp=>{
        this.$message.success('删除成功');
      })
      this.getOrderList(this.pageUtil);
    }
  }
}
</script>

<style scoped>
.orderListBox{
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: auto;
}
.orderBox{
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #b5a1a1;
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-top: 20px;
  margin-bottom: 20px;
}
.headerInfo{
  display: flex;
  align-items: center;
  font-size: 15px;
  padding: 5px;
  width: 100%;
  height: 40px;
}
.orderSpanInfo{
  display: flex;
  width: 100%;
  height: 100px;
  align-items: center;
  margin-top: 20px;
  font-size: 20px;
  padding: 5px;
  background-color: #fdf8f8;
}
.orderSpanFooter{
  display: flex;
  width: 100%;
  justify-content: right;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  background-color: #fdf8f8;
}
.image{
  cursor: pointer;
  display: block;
  width: 60px;
  height: 70px;
}
.no-data{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align:center;
  font-size:20px;
  color:#999999;
  margin:auto;
}
</style>