require("express-async-errors");
const express = require("express");
const auth = require("../controller/auth.js");
const voteController = require("../controller/vote.js");
const router = express.Router();

router.get("/", voteController.get);
router.get("/:voteId", voteController.getById);

router.get("/comment/:voteId", voteController.getComment);
router.get("/comment/modify/:commentId", auth, voteController.getCommentById);

router.post("/comment", auth, voteController.postComment);
router.post("/", auth, voteController.post);

router.patch("/", auth, voteController.patch);
router.patch("/comment", voteController.patchComment);

router.delete("/:voteId", auth, voteController.delete);
router.delete("/comment/:commentId", auth, voteController.deleteComment);

module.exports = router;
