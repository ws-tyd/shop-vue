import axios from "axios";
import {ElMessage} from 'element-plus'

axios.defaults.timeout = 8000;
// axios.defaults.baseURL='/api'
//拦截器
axios.interceptors.response.use(function(response){
    let res = response.data;
    let path = location.hash;
    if(res.status == 200||res.status == 201){
        return res;
    }else if(res.status == 401){
        if (path != '#/index'){
            window.location.href = '/#/login';
        }
        sessionStorage.removeItem("Authorization")
        // this.$message.warning(res.message);
        ElMessage.warning(res.message);
        return Promise.reject(res);
    }else{
        // this.$message.warning(res.message);

        ElMessage.warning(res.message);
        return Promise.reject(res);
    }
},(error)=>{
    let res = error.response;
    let path = location.hash;
    if (res.data.status === 1000) {
        index.push({path: '/applylicense'})
    }else if (res.data.status === 401){
        if (path != '#/index'){
            window.location.href = '/#/login';
        }
        window.localStorage.clear();
        ElMessage.error(res.data.message);
    } else{
        ElMessage.error(res.data.message);
    }
    return Promise.reject(error);
});
axios.interceptors.request.use((request)=>{
    let token=window.localStorage.getItem('Authorization')
    if (token!=null&&token.length>10){
        token="Bearer "+token;
        request.headers.Authorization=token;
    }
    return request;
});

export default axios