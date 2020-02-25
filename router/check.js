const Router = require("koa-router");
const check = require("../controll/check");
const router = new Router();
router.post("/check", async ctx => {
  ctx.body = {
    code: 1
  };
});

module.exports = router;
