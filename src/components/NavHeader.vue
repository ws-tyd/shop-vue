<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a v-if="userName">{{userName}}</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="!userName" @click="login">登录</a>
          <a href="javascript:;" v-if="userName" @click="logout">退出</a>
          <a href="/#/orders/1" v-if="userName">我的订单</a>
          <a href="/#/collection" v-if="userName">我的收藏</a>
          <a href="/#/address" v-if="userName">地址列表</a>
          <a href="/#/user" v-if="userName">个人中心</a>
          <a href="/#/admin" v-if="type==='staff'">后台管理</a>
          <a href="javascript:;" v-if="userName" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>

        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="logo">
          <img src="../assets/images/eshop.png" @click="toIndex()">
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    name:'nav-header',
    data(){
      return {
        phoneList:[],
        // eslint-disable-next-line no-mixed-spaces-and-tabs
		    type:'',
        // userName:'',
      }
    },
    computed:{
      userName(){
        return this.$store.state.userName;
      },
      cartCount(){
        return this.$store.state.cartCount;
      },
      ...mapState(['cartCount'])
    },
    filters:{
      currency(val){
        if(!val)return '0.00';
        return '￥' + val.toFixed(2) + '元';
      }
    },
    mounted(){
      // this.getProductList();
      let params = this.$route.params;
      // this.userName=sessionStorage.getItem('saveUserName')
      // this.type=sessionStorage.getItem('type')
      if(params && params.from == 'login'){
        this.getCartCount();
      }
    },
    methods:{
		toIndex() {
			this.$router.push('/')
		},
      login(){
        this.$router.push('/login');
      },

      getCartCount(){
        this.axios.get('/api/cart/sum').then((res=0)=>{
          this.$store.dispatch('saveCartCount',res);
        })
      },
      logout(){
      this.$store.dispatch('loginOut').then(resp=>{
        if (resp){
          this.$message.success('退出成功');
          this.$router.push('/')
        }
      })
      },
      goToCart(){
        this.$router.push('/cart');
      }
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/base.scss';
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/config.scss';
  .header{
    .nav-topbar{
      height:40px;
      line-height:39px;
      background-color:#f0f0f0;
      color:#B0B0B0;
      .container{
        @include flex();
        a{
          display:inline-block;
          color: #000000;
          margin-right: 20px;
          text-decoration:none;
        }
        .my-cart{
          width:110px;
          background-color:#FF6600;
          text-align:center;
          color:#ffffff;
          margin-right:0;
        }
      }
    }
	.logo{
		position: relative;
		left: -70px;
	}
    .nav-header{
      .container{
        position:relative;
        height:112px;
        @include flex();
        .header-menu{
          .item-menu{
            span{
            }
            &:hover{
              color:$colorA;
              .children{
                height:220px;
                opacity:1;
              }
            }
            .children{
              .product{
                a{
                  display:inline-block;
                  text-decoration:none;
                }
                img{

                }
                .pro-img{
                  height:137px;
                }
                .pro-name{
                  font-weight:bold;
                  margin-top:19px;
                  margin-bottom:8px;
                  color:$colorB;
                }
                .pro-price{
                  color:$colorA;
                }
                &:before{
                  content:' ';
                  position:absolute;
                  top:28px;
                  right:0;
                  border-left:1px solid $colorF;
                  height:100px;
                  width:1px;
                }
                &:last-child:before{
                  display:none;
                }
              }
            }
          }
        }
        .header-search{
          width:319px;
          .wrapper{
            height:50px;
            border:1px solid #E0E0E0;
            display:flex;
            align-items:center;
            input{
              border:none;
              box-sizing: border-box;
              border-right:1px solid #E0E0E0;
              width:264px;
              height:50px;
              padding-left:14px;
            }
            a{
              @include bgImg(18px,18px,'/imgs/icon-search.png');
              margin-left:17px;
              text-decoration:none;
            }
          }
        }
      }
    }
  }
</style>
