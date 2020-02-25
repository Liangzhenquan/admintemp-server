使用：

- koa
- koa-router --路由配置
- koa-cors --跨域处理
- nodemon --监听文件修改
- jsonwebtoken --用于生成 token
- koa-bodyparser

## jsonwebtoken

可参考:![jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

```js
const jwt = require("jsonwebtoken");
const fs = require("fs");
// 读取私钥，这里我的私钥是乱输入一通。
const privateKey = fs.readFileSync("private.key");
// 拿到请求内容后，去数据库匹配是否账号密码对应，如果对应上，发送token给前端
const user = ctx.request.body;
let result = users.filter(u => {
  return u.name === user.name && u.password === user.password;
});
if (result.length > 0) {
  const [data] = result;
  const exp = Math.floor(Date.now() / 1000) + 60 * 60;
  const token = jwt.sign({ exp, data }, privateKey);
  const decoded = jwt.verify(token, privateKey);
  ctx.body = {
    token
  };
} else {
  ctx.body = {
    msg: "用户名或密码错误"
  };
}
```

## 目录结构

```
-controll
   -check.js //检查解析token是否正确
-mockData  //模拟数据库数据
-router   //路由配置
index.js  //server 入口文件
private.key  //生成token的私钥，加密解密用
...
```
