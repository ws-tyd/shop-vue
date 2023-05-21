<template>
  <div style="margin-left: 50px">
  <span style="display:block;margin-top: 40px;margin-right: 50px">
      <h1 style="float: left">商品列表</h1>
  </span>
    <div class="proBox">
      <div v-if="proList.length==0" class="no-data">
          <img src="/imgs/icon-no-data.png" alt="">
          <p>没有找到更多的数据了。。。。。</p>
      </div>
      <div v-else v-for="(item,index) in proList" :key="index" class="proCard" @click="toUrl('/proinfo/'+item.id)">
        <img :src="'/api'+item.mainImage" :alt="item.name" class="imgBox">
        <span class="proName">{{item.name}}</span>
        <span class="price">{{item.price}}元</span>
      </div>
    </div>
    <el-pagination
        background
        :page-sizes="[5,8,10,15,20]"
        :page-size="10"
        layout="sizes, prev, pager, next"
        :total="1000"
        :current-page="parseInt(this.$route.params.current)"
        @size-change="sizeChange"
        @current-change="currentChage"
        style="margin-top: 50px"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "ProList",
  data(){
    return{
      proList:[],
      pageUtil:{
        current:1,
        size:10
      }
    }
  },
  mounted() {
    this.getProList(this.pageUtil)
  },
  beforeRouteUpdate(to,from,next){
    next();
    this.pageUtil.current=to.params.current;
    this.getProList(this.pageUtil)

  },
  methods:{
    sizeChange(size){
      this.pageUtil.size=size;
      this.getProList(this.pageUtil)
    },
    currentChage(current){
      this.pageUtil.current=current;
      this.$router.push("/topro/"+current)
    },
    async getProList(data){
      await this.axios.post("/api/product",data).then(resp=>{
        this.proList=resp.data.records;
        // this.proList=resp.data.items;
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
  min-height: 277px;
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
.no-data{
     text-align:center;
     font-size:20px;
     color:#999999;
     margin:auto;
}
img {
  width: 240px;
  height: 180px;
  margin-bottom: 30px;
}
</style>