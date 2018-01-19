import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import { refreshToken } from './request';

export const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  sync: {
    accessToken(params) {
      let { resolve, reject } = params;
      refreshToken()
        .then(data => resolve && resolve(data.access_token))
        .catch(err => reject && reject(err));
    }
  }
});

/**
 * 客户端缓存保存 token 数据
 * @param {object} data - 登录成功后服务器返回的数据
 * @param {string} data.access_token
 * @param {string} data.refresh_token
 * @param {number} data.expires_in
 */
export function saveToken({ access_token, refresh_token, expires_in }) {
  storage.save({
    key: 'accessToken',
    data: access_token,
    expires: 1000 * 10 // 10s 后过期，测试自动刷新 token
    // expires: 1000 * (expires_in - 120) // access_token 有效期 2 小时，保险起见客户端减少 2 分钟
  });
  storage.save({
    key: 'refreshToken',
    data: refresh_token,
    expires: 1000 * 3600 * 24 * 30 // refresh_token 保存 30 天
  });
}

export function removeTokens() {
  storage.remove({
    key: 'accessToken'
  });
  storage.remove({
    key: 'refreshToken'
  });
}