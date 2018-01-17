# React Navigation 身份验证流程

身份验证是 APP 中十分常见的一个模块，此示例基于 React Navigation 和 Token 机制实现了 React Native APP 中的身份验证流程。

## 如何测试

1. 启动 APP

APP 目前只考虑了 IOS，建议测试时使用 IOS。

```bash
$ cd <project_root>
$ yarn install
$ react-native run-ios
```


2. 启动后台服务

```bash
$ cd server
$ yarn install
$ yarn start
```