import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import mutations from './mutations'
import actions from './action'

const state = {
  user:{
    id:'',
    createTime:'',
    userName:'',
    nickname:'',
    email:'',
    type:'',
    balance:'',
    phone:'',
  },
  userName:'',//登录用0
  type:'',
  cartCount:0,//购物车商品数量
  addressList:[],
  breadcrumbList:[],
  Authorization:''
}
export default createStore({
  state,
  mutations,
  actions,
  plugins: [
    createPersistedState({
      storage:window.sessionStorage
    })]
});

