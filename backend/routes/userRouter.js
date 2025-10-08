const express = require("express")
const { protect, adminOnly } = require("../middlewares/auth")
const { getUsers, getUserById, deleteUser } = require("../controllers/userController")

const userRouter = express.Router()
userRouter.get("/",protect,adminOnly,getUsers)
userRouter.get("/:id",protect,getUserById)


module.exports = userRouter;