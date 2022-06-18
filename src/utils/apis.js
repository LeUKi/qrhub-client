import axios from 'axios';
import {
    ElMessage
} from 'element-plus'

let head = 'http://'
axios.defaults.timeout = 15000;
axios.interceptors.response.use(
    function (response) {
        ElMessage({
            type: 'success',
            duration: 600,
            position: 'bottom-right',
            center: true,
        })
        return response.data;
    },
    function (error) {
        ElMessage({
            type: 'error',
            duration: 5000,
            position: 'bottom-right',
            center: true,
            message: error,
            showClose: true,
        })
        return Promise.reject(error);
    }
)


export const _getConfigs = (host) => {
    return getRequest('/configsGet', {}, host);
}
export const _getConfig = (host, params) => {
    return getRequest('/configGet', params, host);
}
export const _postConfigUpdate = (host, params) => {
    return postRequest('/configUpdate', params, host)
}

export const _postConfigDel = (host, params) => {
    return postRequest('/configDel', params, host)
}
export const _postConfigNew = (host, params) => {
    return postRequest('/configNew', params, host)
}
const getRequest = (url, params, host) => {
    return axios({
        method: 'get',
        url: `${head}${host}${url}`,
        params: params,
    });
};

const postRequest = (url, params, host) => {
    return axios({
        method: 'post',
        url: `${head}${host}${url}`,
        data: params,
    });
};