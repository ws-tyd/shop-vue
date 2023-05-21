<template>
<div style="margin-left: 50px">
  <span style="display:block;margin-top: 40px;margin-right: 50px">
      <h1 style="float: left">热门商品</h1>
      <h1 style="float: right;cursor: pointer;" @click="toUrl('/topro/1')">商品列表></h1>
  </span>
  <div class="proBox">
    <div v-for="(item,index) in hotList" :key="index" class="proCard" @click="toUrl('/proinfo/'+item.id)">
      <img :src="'/api'+item.mainImage" :alt="item.name" class="imgBox">
      <span class="proName">{{item.name}}</span>
      <span class="price">{{item.price}}元</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "HotPro",
  data(){
    return{
      hotList:[],
    }
  },
  mounted() {
    this.getHotPro();
  },
  methods:{
    getHotPro(){
      this.axios.post("/api/product/getHot",{"size": 8,"current": 1}).then(resp=>{
        this.hotList=resp.data.records;
        // this.hotList=resp.data.items;
      })
    },
    toUrl(url){
      this.$router.push(url);
    }
  }
}
</script>

<style scoped>
.proBox{
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  width: 100%;
  height: auto;
  margin: 20px;
}
.proCard{
  padding: 10px;
  float: top;
  margin: 55px;
  width: 15%;
  height: 30%;
  transition: ease-in-out 0.5s;
  border: #ffffff 1px solid;
  /*background-color: #666666;*/
}
@media  only screen and (max-width: 1080px) {
  .proCard{
    width: 20%;
    height: 40%;
  }
}
@media  only screen and (max-width: 400px) {
  .proCard{
    width: 50%;
    height: 40%;
  }
}
.proCard:hover{
  border: #e03b3b 1px solid;
  box-shadow:5px 5px 10px 5px #ccc;
}
.imgBox{
  display: block;
  width: 100%;
  height: 100%;
}
.proName{
  display: block;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.price{
  display: block;
  width: 100%;
  text-align: center;
  color: red;
  font-size: 25px;

}
</style>