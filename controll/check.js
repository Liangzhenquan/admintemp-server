const jwt = require("jsonwebtoken");
const fs = require("fs");
async function check(ctx, next) {
  let url = ctx.request.url;
  if (url == "/login") {
    await next();
  } else {
    try {
      let token = ctx.request.headers["authorization"];
      const privateKey = fs.readFileSync("private.key");
      const decoded = jwt.verify(token, privateKey);
      if (decoded) {
        await next();
      } else {
        ctx.status = 403;
        ctx.body = {
          code: -1,
          msg: "token过期，请重新登录"
        };
      }
    } catch (err) {
      ctx.status = 403;
      ctx.body = {
        code: -1,
        msg: "token过期，请重新登录"
      };
    }
  }
}

module.exports = check;
