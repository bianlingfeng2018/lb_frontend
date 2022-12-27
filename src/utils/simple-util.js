/**
 * Created by Lingfeng 2022/10/29
 */
import config from "@/utils/config"

const { prefix } = config[process.env.NODE_ENV]

/**
 * 格式化时间
 * @param str
 * @returns {string|null}
 */
export function timeFormatFilter(str) {
  if (str == null) {
    return null
  }
  const d = new Date(str)
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDay()
}

/**
 * 生成文件访问url
 * @param file 文件对象
 * @returns {string} 文件url
 */
export function getFileBlobUrl(file) {
  console.log(file)
  const _url = prefix.lb + "/api/file?path=" + file.path + "&name=" + file.name
  return _url.replaceAll('\\', '%2F')
}

/**
 * 为get请求拼接url参数
 * @param url
 * @param params
 * @returns {*}
 */
export function appendParamsToUrl(url, params) {
  if (params) {
    const paramsArray = []
    // 拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return url
}

///金额过滤器  分转元
export function changePrice2money(s) {
  if (s == null) return '0.00';
  if (/[^0-9\.]/.test(s)) return "0.00";
  s = s.toString().replace(/\$|\,/g, '');
  if (isNaN(s)) return '0.00';
  var num = (s / 100).toFixed(4) + '';
  var str = num.substring(0, num.lastIndexOf('.') + 3);
  var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
  var dot = str.substring(str.length, str.indexOf("."))//取到小数部分
  return intSum + dot;
}

