const { Router } = require("express");
const { addUser, login, listUsers, removeUser, updateUserInfo, updatePassword,updateCurrentWeight,findUser,findUserInfo } = require("./userControllers");
const { hashPassword, tokenCheck } = require("../middleware");

const userRouter = Router();

userRouter.post("/user/signup", [hashPassword], addUser);
userRouter.post("/user/login", login);
userRouter.get("/user/list", listUsers); //<- later needs tokencheck middleware
userRouter.post("/user/remove", removeUser); //<- later needs tokencheck middleware
userRouter.patch("/user/updateUserInfo", updateUserInfo); //<- later needs tokencheck middleware
userRouter.patch("/user/updatePassword", [hashPassword], updatePassword); //<- later needs tokencheck middleware
userRouter.patch("/user/updateCurrentWeight", updateCurrentWeight); //<- later needs tokencheck middleware
userRouter.get("/user/findUserInfo", [tokenCheck], findUserInfo);
userRouter.get("/user/findUser", [tokenCheck], findUser);


module.exports = userRouter;