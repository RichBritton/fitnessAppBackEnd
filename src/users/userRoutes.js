const { Router } = require("express");
const { addUser, login, listUsers, removeUser, updateUser } = require("./userControllers");
const { hashPassword, tokenCheck } = require("../middleware");

const userRouter = Router();

userRouter.post("/user/signup", [hashPassword], addUser);
userRouter.post("/user/login", login);
userRouter.get("/user/list", listUsers); //<- originally had tokencheck middleware
userRouter.post("/user/remove", removeUser); //<- originally had tokencheck middleware
userRouter.patch("/user/update", [hashPassword], updateUser); //<- originally had tokencheck middleware


module.exports = userRouter;