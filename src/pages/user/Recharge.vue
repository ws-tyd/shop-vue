<template>
<div class="rechargeBox">
  <div v-for="(item,index) in moneys" :key="index" class="moneyBox">
    <span @click="isOK(item)">{{item}}元</span>
  </div>
</div>
</template>

<script>
export default {
  name: "Recharge",
  data(){
    return{
      moneys:[6,30,68,128,324,648,9999999]
    }
  },
  methods:{
    isOK(money){
      this.$confirm('你将充值'+money+'元, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.rechargeMoney(money)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消充值'
        });
      });
    },
    rechargeMoney(money){
      this.axios.post('/api/recharge' ,{balance:money}).then(resp=>{
        if (resp.status===200){
          this.$message({
            type: 'success',
            message: '充值成功!'
          });
        }
      })
    }
  }
}
</script>

<style scoped>
.rechargeBox{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 300px;
  height: 100%;
}
.moneyBox{
  display: flex;
  width: 23%;
  height: 30%;
  min-height: 100px;
  margin: 3px;
  font-size: 25px;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  background-color: #ee4e4e;
  color: #ffb30c;
  justify-content: center;
  align-items: center;
}
.moneyBox:before{
  content: '￥';
}
</style>