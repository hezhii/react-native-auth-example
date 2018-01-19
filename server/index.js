const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const app = express();

const ACCESS_TOKENS = {};
const REFRESH_TOKENS = {};

const USERS = {
  admin: 'admin'
};

const PARAMS_ERROR = {
  status: 'failure',
  message: '请求参数不合法'
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/register', function (req, res) {
  const { username, password } = req.body;
  console.log(`用户：${username}，申请注册，密码为：${password}`);
  if (!username || !password) {
    res.json(PARAMS_ERROR);
    console.log('请求参数不合法');
  } else if (USERS[username] != null) {
    res.json(responseError('该用户已注册'));
    console.log(`用户: ${username}，已注册`);
  } else {
    USERS[username] = password;
    res.json(responseSuccess('注册成功'));
    console.log(`用户: ${username}，注册成功`);
  }
});

app.post('/login', function (req, res) {
  const { username, password } = req.body;
  console.log(`用户：${username}，正在登录，登录密码为：${password}`);
  if (USERS[username] === password) {
    clearOldToken(username);

    const accessToken = uuidv4();
    const refreshToken = uuidv4();
    ACCESS_TOKENS[accessToken] = username;
    REFRESH_TOKENS[refreshToken] = username;
    res.json(responseSuccess('登录成功', {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 7200 // access_token 过期时间为 2 小时
    }));
    console.log(`用户: ${username} 登录成功`);
    console.log(`ACCESS_TOKENS:${JSON.stringify(ACCESS_TOKENS)}\nREFRESH_TOKENS:${JSON.stringify(REFRESH_TOKENS)}`);
  } else {
    res.json(responseError('用户名或密码错误'));
    console.log(`用户: ${username}，登录失败`);
  }
});

app.get('/refresh_token', function (req, res) {
  const refreshToken = req.query && req.query.refresh_token;
  console.log('Refresh token with token: ' + refreshToken);
  if (refreshToken) {
    const username = REFRESH_TOKENS[refreshToken];
    if (username) {
      clearOldToken(username);

      const accessToken = uuidv4();
      const refreshToken = uuidv4();
      ACCESS_TOKENS[accessToken] = username;
      REFRESH_TOKENS[refreshToken] = username;
      res.json(responseSuccess('成功', {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: 7200 // access_token 过期时间为 2 小时
      }));
      console.log(`ACCESS_TOKENS:${JSON.stringify(ACCESS_TOKENS)}\nREFRESH_TOKENS:${JSON.stringify(REFRESH_TOKENS)}`);
      return;
    }
  }
  res.json(responseError('token 错误'));
});

app.get('/logout', function (req, res) {
  const token = req.headers && req.headers.authorization;
  console.log('Log out with token: ' + token);
  if (token && ACCESS_TOKENS[token]) {
    clearOldToken(ACCESS_TOKENS[token]);
    res.json(responseSuccess('登出成功'));
    console.log(`ACCESS_TOKENS:${JSON.stringify(ACCESS_TOKENS)}\nREFRESH_TOKENS:${JSON.stringify(REFRESH_TOKENS)}`);
  } else {
    res.json(responseError('token 错误'));
  }
});

const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
  console.log(`ACCESS_TOKENS:${JSON.stringify(ACCESS_TOKENS)}\nREFRESH_TOKENS:${JSON.stringify(REFRESH_TOKENS)}`);
});

function responseError(message, data) {
  return {
    status: 'failure',
    message,
    data
  };
}

function responseSuccess(message, data) {
  return {
    status: 'success',
    message,
    data
  };
}

function clearOldToken(username) {
  for (let token in ACCESS_TOKENS) {
    if (ACCESS_TOKENS[token] === username) {
      delete ACCESS_TOKENS[token];
      break;
    }
  }
  for (let token in REFRESH_TOKENS) {
    if (REFRESH_TOKENS[token] === username) {
      delete REFRESH_TOKENS[token];
      break;
    }
  }
}