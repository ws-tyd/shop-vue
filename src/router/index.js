import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../pages/home.vue'
import Index from '../pages/index.vue'
import store from '../store/index'
import axios from "../config/request";

const routesMap = [
	{
		path: '/',
		name: 'home',
		component: Home,
		redirect: '/index',
		children: [
			{
				path: '/index',
				name: 'index',
				component: Index,
			},
			{
				path: '/order/:id',
				name: 'OrderBuyPage',
				component: ()=>import('../pages/OrderBuyPage.vue')
			},
			{
				path: '/topro/:current',
				name: 'topro',
				component: () => import('../components/ProList.vue')
			},
			{
				path: '/proInfo/:id',
				name: 'proInfo',
				component: () => import('../components/ProductParam.vue')
			},
			{
				path: '/orders/:current',
				component: () => import('../pages/OrderList.vue'),
				hidden: true
			},
			{
				path: '/address',
				component: () => import('../pages/Address.vue'),
				hidden: true
			},
			{
				path: '/cart',
				name: 'cart',
				component: ()=>import('../pages/Cart.vue')
			},
			{
				path:'payPage/:orderNo',
				name: 'payPage',
				component:()=>import('../pages/PayPage.vue')
			},
			{
				path:'collection',
				name: 'collection',
				component:()=>import('../pages/Collection.vue')
			},
		]
	},
	{
		path: '/user',
		name: "user",
		component: ()=>import('../pages/user/index.vue'),
		children: [
			{
				path: '',
				name: 'userInfo',
				component:()=>import('../pages/user/UserInfo.vue')
			},
			{
				path:'address',
				name: 'Address',
				component:()=>import('../pages/Address.vue')
			},
			{
				path:'password',
				name: 'Password',
				component:()=>import('../pages/user/updatePass.vue')
			},
			{
				path:'money',
				name: 'Money',
				component:()=>import('../pages/user/Recharge.vue')
			},
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../pages/login.vue')
	},
	{
		path: '/applylicense',
		component: () => import('../pages/applylicense.vue'),
		hidden: true
	},
	{
		path: '/admin',
		component: ()=>import('../pages/admin/index.vue'),
		children: [
			{
				path: '',
				name: 'main',
				component: ()=>import('../pages/admin/Main.vue'),
			},
			{
				path: 'proList/:current',
				name: 'proList',
				component: ()=>import('../pages/admin/ProListAdmin.vue'),
			},
			{
				path: 'user/:current',
				name: 'UserList',
				component: ()=>import('../pages/admin/UserList.vue'),
			},
			{
				path: 'category/:current',
				name: 'categoryList',
				component: ()=>import('../pages/admin/Category.vue'),
			},
		]
	}

]

const index =createRouter({
	history:createWebHashHistory(),
	routes:routesMap,
	base:'/dist',
	mode:'history',
})

 index.beforeEach((to, from, next)=>{
	let token=window.localStorage.getItem('Authorization')
	let flag=true;
	 // console.log(store.state.Authorization)
	if (token!=null){
			axios.post('/api/userSession').then(resp=>{
				store.dispatch("saveUserName", resp.data.userName);
				store.commit('saveType',resp.data.type)
				store.dispatch("saveUserInfo", resp.data);
				if (to.fullPath.indexOf('/admin')!==-1&&resp.data.type!=='staff'){
					window.location.href='/'
					alert('权限不足')
				}
			})
	}else {
		if (to.fullPath.indexOf('admin')!==-1){
			flag=false;
			window.location.href='/'
			alert('权限不足')
		}
	}
	let count=window.localStorage.getItem("cartCount")
	if (count!=null){
		store.dispatch('saveCartCount',count)
	}
	if (flag){
		next();
	}
})
// });
export default index
