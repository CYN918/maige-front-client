import CryptoJS from 'crypto-js'

export const handleCrypt = {
  // 加密
  encrypt(word, keyStr) {
    keyStr = keyStr || '_fuyuanai@Maige_'
    const key = CryptoJS.enc.Utf8.parse(keyStr) // Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    const srcs = CryptoJS.enc.Utf8.parse(word)
    const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
  },
  // 解密
  decrypt(word, keyStr) {
    keyStr = keyStr || '_fuyuanai@Maige_'
    const key = CryptoJS.enc.Utf8.parse(keyStr) // Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    const decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },
}

// 解析url的query
export const parseUrl = (query) => {
  const reg = /([^?=&]+)[=\s]([^=&?]+)/g
  const obj = {}
  while (reg.exec(query)) {
    obj[RegExp.$1] = RegExp.$2;
  }
  return obj;
}

// 设置cookie
export const setCookie = (name, value, day) => {
  const date = new Date();
  date.setDate(date.getDate() + day);
  document.cookie = name + '=' + value + ';expires=' + date;
};

// 获取cookie
export const getCookie = (name) => {
  const reg = RegExp(name + '=([^;]+)');
  const arr = document.cookie.match(reg);
  if (arr) {
    return arr[1];
  }
  return '';
}

// 删除cookie
export const delCookie = (name) => {
  setCookie(name, null, -1);
}

// 判断是否为登录状态
export const isLogin = () => {
  const userData = getCookie('userData')
  const userInfo = userData && JSON.parse(userData)
  return userInfo
}

// 函数节流
let firstEnter = true
export const throttle = (context, func, delay) => function (...args) {
  if (firstEnter) { // firstEnter为true允许触发
    func.apply(context, args);
    firstEnter = false // 防止连续触发
    const timer = setTimeout(() => { // 一段时间后再次允许触发
      firstEnter = true
      clearTimeout(timer)
    }, delay)
  }
}
// 提示弹窗
export const tipPop = (constext, type, message, duration) => {
  constext.$message({
    type,
    message,
    duration,
  })
}

// 弹窗节流
export const throttleTipPop = (context, type, message, delay = 2000) => {
  throttle(context, tipPop, delay)(context, type, message, delay)
}

//获取url得参数
export  const  addressUrl=()=>{
  let url=location.href;
  let i=url.indexOf('?');
  if(i==-1)return;
  let querystr=url.substr(i+1);
  let arr1=querystr.split('&');
  let arr2=new Object();
  for  (i in arr1){
    let ta=arr1[i].split('=');
    arr2[ta[0]]=ta[1];
  }
  return arr2;
}
