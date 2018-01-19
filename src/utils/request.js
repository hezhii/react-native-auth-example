import { saveToken, storage } from './storage';

const qs = require('qs');

const BASE_URL = 'http://localhost:8080';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json;charset=utf-8'
};

/**
 * 请求 API 接口
 *
 * @param {Object} options
 * @param {string} options.url - 接口地址
 * @param {string} options.method - 请求类型
 * @param {Object} options.headers - 请求头
 * @param {Object} options.params - url 参数
 * @param {Object} options.data - 请求体数据
 */
export default function request({ url, method, headers, params, data, access_token }) {
  let isOk;
  url = BASE_URL + url;
  if (params) {
    url = url + '?' + paramsSerializer(params);
  }
  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers: { ...DEFAULT_HEADERS, ...headers, Authorization: access_token },
      body: JSON.stringify(data)
    })
      .then(response => {
        isOk = !!response.ok;
        return response.json();
      })
      .then(responseData => {
        if (isOk && responseData.status === 'success') {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function requestWithToken(options) {
  return storage.load({
    key: 'accessToken',
    syncInBackground: false
  }).then(result => request({ ...options, access_token: result }));
}

export function refreshToken() {
  console.log('Refresh token...');
  return storage.load({
    key: 'refreshToken'
  }).then(result => {
    return request({
      method: 'GET',
      url: '/refresh_token',
      params: {
        refresh_token: result
      }
    }).then(({ data }) => {
      saveToken(data);
      return data;
    });
  });
}

/**
 * 请求参数序列化
 *
 * @param {Object} params - 请求参数
 * @returns {string}
 */
function paramsSerializer(params) {
  return qs.stringify(params, { arrayFormat: 'brackets' });
}