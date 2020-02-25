const Router = require("koa-router");
const users = require("../mockData/user.json");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const router = new Router();
router.post("/login", async ctx => {
  try {
    const privateKey = fs.readFileSync("private.key");
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
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      msg: err
    };
  }
});

module.exports = router;
