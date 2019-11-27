/*
  ajax请求函数模块
  返回值：promise对象(异步返回的数据是：response.data)
 */
import axios from 'axios'
import { getCookie, throttleTipPop, delCookie } from '@/assets/utils/utils'
import Vue from 'vue'

const vm = new Vue()

export default function ajax(url, data = {}, type = 'GET', needToken = false) {
  return new Promise((resolve, reject) => {
    // 执行异步ajax请求
    let promise
    if (needToken) {
      const obj = getCookie('userData')
      axios.defaults.headers.common.token = obj && JSON.parse(obj).token
    }
    if (type === 'GET' || type === 'DELETE') {
      // 准备url query参数数据
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach((key) => {
        dataStr += `${key}=${data[key]}&`
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = `${url}?${dataStr}`
      }
      // 发送get请求
      if (type === 'GET') {
        promise = axios.get(url)
      } else if (type === 'DELETE') {
        promise = axios.delete(url)
      }
    } else if (type === 'POST') {
      // 发送post请求
      promise = axios.post(url, data)
    } else if (type === 'PUT') {
      promise = axios.put(url, data)
    }

    promise.then((response) => {
      const context = Vue.prototype;
      // 成功了调用resolve()
      resolve(response.data)
      //不等于200 同意抛出错误
      // if(response.data.code != 200){
      //   throttleTipPop(context,'error',response.data.message)
      // }
    }).catch((error) => {
      const { data, status } = error.response;
      const context = Vue.prototype;
      //对各项状态码进行详细处理
      switch (status) {
        case 401:
          // Token过期
          if (data.code == 10101) {
            console.log("登录状态已经过期，请重新登录")
            delCookie('userData')
            setTimeout(() => {
              window.location.href = 'login.html'
            }, 2000)
            return;
          }
          break;
        case 403:
          console.log("未授权访问资源");
          return;
        case 404:
          console.log("未找到对应接口");
          return;
        case 500:
          console.log("服务发生异常, 请向服务商反馈");
          return;
        case 503:
          console.log("服务暂时停止访问, 请稍后再试");
          return;
      }
      console.log(data.message || error.message);
    })
  })
}
