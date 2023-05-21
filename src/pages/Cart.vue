<template>
  <div class="Main">
    <el-col :span="22" :offset="1" >
    <el-row st>
      <el-col :span="24" class="productTitle">
        <el-col :span="2">
          <el-checkbox v-model="allflag" @change="chaneFlagAll" label="全部选择"></el-checkbox>
        </el-col>
        <el-col :span="3" >
          <span>图片详细</span>
        </el-col>
        <el-col :span="2" :offset="1" >
          <span>商品信息</span>
        </el-col>
        <el-col :span="2" :offset="1" >
          <span>商品名</span>
        </el-col>
        <el-col :span="2" :offset="1" >
          <span>商品单价</span>
        </el-col>
        <el-col :span="2" :offset="1" >
          <span>商品数量</span>
        </el-col>
        <el-col :span="2" :offset="1" >
          <span>小计</span>
        </el-col>
        <el-col :span="2" :offset="1" >
          <span>操作</span>
        </el-col>
      </el-col>
    </el-row>
    </el-col>
    <el-col v-for="(item,index) in cart" :key="index" class="cartBox" :spam="22" :offset="1">
      <el-row>
        <el-col :span="22" :offset="1" class="productBox">
          <el-col :span="2">
            <el-checkbox v-model="item.selected" @change="chaneFlag(item)" label="是否选择"></el-checkbox>
          </el-col>
          <el-col :span="3" >
            <el-image :src="'/api'+item.productMainImage" class="proImage"></el-image>
          </el-col>
          <el-col :span="2" :offset="1" >
            <span style="text-align: left;float: left">{{item.productSubtitle}}</span>
          </el-col>
          <el-col :span="2" :offset="1" >
            <span style="text-align: center;">{{item.productName}}</span>
          </el-col>
          <el-col :span="2" :offset="1" >
            <span style="text-align: center;color: red;">￥{{item.productUnitPrice}}</span>
          </el-col>
          <el-col :span="2" :offset="1" >
            <el-input-number v-model="item.quantity" :min="1" size="small" @change="numberChage(item)"></el-input-number>
          </el-col>
          <el-col :span="2" :offset="1" >
            <span style="text-align: center;color: red;">￥{{item.productTotalPrice}}</span>
          </el-col>
          <el-col :span="2" :offset="1" >
            <el-button type="danger" circle @click="deleteFromCart(item)">
              <el-icon>
                <Delete/>
              </el-icon>
            </el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="22" :offset="1">
    <el-row style="display: flex;width: 100%;height: 100%;justify-content: left">
      <el-col :span="24"  class="productTitle">
        <el-col :span="2" >
          <el-checkbox v-model="allflag" @change="chaneFlagAll" label="全部选择"></el-checkbox>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button  type="info" :text="true" style="color: black" @click="deleteSeleced">删除选中的</el-button>
        </el-col>
        <el-col :span="10">
          <span style="float: right;color: red">总计 ￥{{total}}</span>
        </el-col>
        <el-col :span="2" :offset="1">
          <span style="float: right;color: red">选中数量: {{count}}</span>
        </el-col>
        <el-col :span="2" :offset="2">
          <el-button type="danger" :text="true" style="width: 100%;color: red;font-size: 20px;font-weight: bold" @click="createOrder">生成订单</el-button>
        </el-col>
      </el-col>
    </el-row>
    </el-col>
    <Address @selectAddress="selectAddress"></Address>
  </div>
</template>

<script>
import Address from "./Address.vue";
import {
  Delete,
} from '@element-plus/icons-vue'
export default {
  name: "Cart",
  components: {Address,Delete},
  data(){
    return{
      allflag:false,
      addressId: 0,
      cart:[],
      total:0,
      count:0,
      payload:{
        cartPros:[],
        addressId:0
      }
    }
  },
  mounted() {
    this.getCart()
  },
  methods:{
    selectAddress(e){
      this.payload.addressId=e
    },
    async getCart(){
      await this.axios.get('/api/cart').then(resp=>{
        this.cart=resp.data;
        window.localStorage.setItem("cartCount",resp.data.length)
        this.$store.dispatch('saveCartCount',resp.data.length)
      })
      this.getTotal();
    },
    async chaneFlag(product){
      await this.updateCart(product.id,product.selected,product.quantity)
      this.getTotal();
    },
    async chaneFlagAll(e){
      await this.cart.forEach(item=>{
        item.selected=e;
        this.updateCart(item.id,item.selected,item.quantity)
      })
      this.getTotal();
    },
    async numberChage(product){
      product.productTotalPrice=product.quantity*product.productUnitPrice;
      await this.updateCart(product.id,product.selected,product.quantity)
      this.getTotal();
    },
    deleteFromCart(product){
      this.$confirm('是否确定要将此'+product.productName+'从你的购物车中移除',{
        cancelButtonText:'取消',
        confirmButtonText:'确定',
        type:'warning'
      }).then(()=>{
        this.axios.delete('/api/cart/'+product.id);
        this.$message.success('已将'+product.productName+'从你的购物车中移除');
        this.getCart();
      }).catch(()=>{
        this.$message.info('已取消将'+product.productName+'从你的购物车中移除');
      })
    },
    deleteSeleced(){
      this.$confirm('是否确定要将选中的商品从你的购物车中移除',{
        cancelButtonText:'取消',
        confirmButtonText:'确定',
        type:'warning'
      }).then(()=>{
        this.cart.forEach(item=>{
          if (item.selected){
            this.axios.delete('/api/cart/'+item.id);
          }
        })
        this.$message.success('已将选中的商品从你的购物车中移除');
        this.getCart();
      }).catch(()=>{
        this.$message.info('已取消将选中的商品从你的购物车中移除');
      })
    },
    getTotal(){
      let num=0;
      let count=0;
      this.cart.forEach(item=>{
        if (item.selected){
          count++;
          num+=item.quantity*item.productUnitPrice;
        }
      })
      this.total=num;
      this.count=count;
    },
    async updateCart(id,selected,count){
       await this.axios.put('/api/cart/'+id,{selected:selected,quantity:count})
    },
    async createOrder(){
      if (this.payload.addressId===0||this.payload.addressId===null){
        this.$message.error('请选择地址后重试');
        return;
      }
      this.cart.forEach(item=>{
        if (item.selected){
          this.payload.cartPros.push({productId:item.productId,count:item.quantity})
        }
      })
      await this.axios.post('/api/cart/orders',this.payload).then(resp=>{
        this.$message.success('生成订单成功');
        setTimeout(()=>{
          this.$router.push('/orders/1');
        },200)
      })
    }
  }
}
</script>

<style scoped>
.Main{
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 80%;
  height: auto;
}
.cartBox{

}
.productTitle{
  display: flex;
  margin: 5px;
  padding: 20px;
  width: 100%;
  height: 100px;
  font-size: 15px;
  font-weight: bold;
  justify-content: left;
  align-items: center;
  border: #cccccc 1px solid;
}
.productBox{
  display: flex;
  margin: 5px;
  padding: 20px;
  width: 95%;
  height: 200px;
  font-size: 15px;
  justify-content: left;
  align-items: center;
  border: #cccccc 1px solid;
}
.proImage{
  width: 80%;
  height: 100%;
}
</style>