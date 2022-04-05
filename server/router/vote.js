require("express-async-errors");
const express = require("express");
const auth = require("../controller/auth.js");
const voteController = require("../controller/vote.js");
const router = express.Router();

router.get("/", voteController.get);
router.get("/:voteId", voteController.getById);

router.post("/", auth, voteController.post);
router.patch("/", auth, voteController.patch);

router.delete("/:voteId", auth, voteController.delete);

module.exports = router;
