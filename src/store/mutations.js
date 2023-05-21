/**
 * 商城Vuex-mutations
 */
export default {
  saveUserName(state, userName) {
    window.localStorage.setItem('saveUserName', userName)
    state.userName = userName;
  },
  saveUserInfo(state, user) {
    state.user = user;
  },
  saveType(state, type) {
    window.localStorage.setItem('type', type)
    state.type = type;
  },
  saveCartCount(state, count) {
    state.cartCount = count;
  },
  saveAddressList(state, value) {
    state.addressList = value;
  },
  saveBreadcrumbList(state, value) {
    let list=[];
    list.push({url:value.url,name:value.name})
    state.breadcrumbList = list;
    // state.breadcrumbList.push({url:value.url,name:value.name})
  },
  saveAuthorization(state,val){
    state.Authorization=val;
  }
}