<template>
  <div id="app" class="appIndex" >
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  data(){
    return {

    }
  },
  mounted(){
    if(sessionStorage.getItem('Authorization')){
      this.getCartCount();
    }
  },
  methods:{
    getCartCount(){
      // this.axios.get('/api/cart/sum').then((res=0)=>{
      //   this.$store.dispatch('saveCartCount',res.data);
      // })
    }
  }
}
</script>
<style scoped>
.appIndex{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
