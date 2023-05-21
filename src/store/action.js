/**
 * 商城Vuex-actions
 */
import axios from "axios";

export default {
  saveUserName(context,userName){
    context.commit('saveUserName', userName);

  },
  saveUserInfo({commit},user){

    commit('saveUserInfo', user);
  },
  saveCartCount(context, count) {
    context.commit('saveCartCount', count);
  },
  saveAuthorization(context,val){
    context.commit('saveAuthorization',val);
  },
  async saveAddressList(context) {
    try {
      const {data}=await axios.get('/api/address')
      context.commit('saveAddressList', data);
      return true
    }catch (e){
      return false
    }

  }  ,
  async createAddress({dispatch},payload) {
    try {
      await axios.put('/api/address',payload)
      dispatch('saveAddressList')
      return true
    }catch (e){
      return false
    }
  },
  async updateAddress({dispatch},payload) {
    try {
      const {addressId,data} =payload
      await axios.put('/api/address/'+addressId,data)
      dispatch('saveAddressList')
      return true
    }catch (e){
      return false
    }
  },
  async deleteAddress({dispatch},id) {
    try {
      await axios.delete('/api/address/'+id)
      dispatch('saveAddressList')
      return true
    }catch (e){
      return false
    }
  },
  //images
  async deleteImage(state,id) {
    try {
      await axios.delete('/api/image/'+id)
      return true
    }catch (e){
      return false
    }
  },
  //loginOut
  async loginOut({dispatch}) {
    try {
      await axios.get('/api/logOut')
      sessionStorage.clear();
      window.localStorage.clear();
      dispatch('saveUserName','');
      dispatch('saveCartCount','0');
      dispatch('saveUserInfo',null);
      return true
    }catch (e){
      return false
    }
  },
  //breadcrumb
  async addbreadcrumb(){

  }
}