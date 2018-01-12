const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
    res.json(responseSuccess('登录成功'));
    console.log(`用户: ${username} 登录成功`);
  } else {
    res.json(responseError('用户名或密码错误'));
    console.log(`用户: ${username}，登录失败`);
  }
});

const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
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