const Koa = require("koa");
const cors = require("koa-cors");
const login = require("./router/login");
const check = require("./router/check");
const bodyParser = require("koa-bodyparser");
const checkControll = require("./controll/check");
const server = new Koa();
server.use(cors());
server.use(bodyParser());
server.use(checkControll);
server.use(login.routes()).use(login.allowedMethods());
server.use(check.routes()).use(check.allowedMethods());
server.listen(7000, () => {
  console.log("server is running 7000");
});
