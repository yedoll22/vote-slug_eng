require("express-async-errors");
const express = require("express");
const auth = require("../controller/auth.js");
const userController = require("../controller/user.js");
const router = express.Router();

router.get("/", userController.get);
router.get("/mypage", auth, userController.getMypage);
router.get("/vote", auth, userController.getMyVote);

router.post("/", userController.signUp);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.patch("/", auth, userController.patch);
router.delete("/", auth, userController.delete);

module.exports = router;
