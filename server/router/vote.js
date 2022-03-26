const express = require("express");
require("express-async-errors");
const { User, Vote, Category, User_vote } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  const { voteId, categoryId } = req.query;

  //GET
  try {
    if (voteId) {
      const selectedVote = await Vote.findByPk(voteId, {
        attributes: [
          "id",
          "voteTitle",
          "voteOption1",
          "voteOption2",
          "voteOption1Count",
          "voteOption2Count",
          "createdAt",
          "User.nickname",
          "Category.categoryTitle",
        ],
        include: [
          { model: Category, attributes: ["categoryTitle"] },
          { model: User, attributes: ["nickname"] },
        ],
      });
      return res.status(200).json(selectedVote);
    }

    // GET /vote?category=:categoryId
    if (categoryId) {
      const selectedVoteList = await Vote.findAll({
        where: { categoryId: categoryId },
        attributes: [
          "id",
          "voteTitle",
          "voteOption1",
          "voteOption2",
          "voteOption1Count",
          "voteOption2Count",
          "createdAt",
          "User.nickname",
          "Category.categoryTitle",
        ],
        include: [
          { model: Category, attributes: ["categoryTitle"] },
          { model: User, attributes: ["nickname"] },
        ],
      });
      return res.status(200).json(selectedVoteList);
    }

    const voteList = await Vote.findAll({
      attributes: [
        "id",
        "voteTitle",
        "voteOption1",
        "voteOption2",
        "voteOption1Count",
        "voteOption2Count",
        "createdAt",
        "User.nickname",
        "Category.categoryTitle",
      ],
      include: [
        { model: Category, attributes: ["categoryTitle"] },
        { model: User, attributes: ["nickname"] },
      ],
    });
    return res.status(200).json(voteList);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

// POST
router.post("/", async (req, res) => {
  // userId 필요
  const { voteTitle, categoryId, voteOption1, voteOption2 } = req.body;

  try {
    await Vote.create({
      userId: 1,
      voteTitle,
      categoryId,
      voteOption1,
      voteOption2,
    });
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

// DELETE
router.delete("/", async (req, res) => {
  const { voteId } = req.query;

  try {
    await Vote.destroy({
      where: { id: voteId },
    });
    return res.status(200).json({ message: "deleted" });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

// PATCH
router.patch("/", async (req, res) => {
  const { voteId, voteOption1, voteOption2 } = req.body;
  try {
    if (voteOption1) {
      await Vote.increment({ voteOption1Count: 1 }, { where: { id: voteId } });
      await User_vote.create({
        userId: 1,
        voteId,
        voteOption1: true,
        voteOption2: false,
      });
      const participatedVote = await Vote.findByPk(voteId, {
        attributes: [
          "id",
          "voteTitle",
          "voteOption1",
          "voteOption2",
          "voteOption1Count",
          "voteOption2Count",
          "createdAt",
          "User.nickname",
          "Category.categoryTitle",
        ],
        include: [
          { model: Category, attributes: ["categoryTitle"] },
          { model: User, attributes: ["nickname"] },
        ],
      });

      return res.status(200).json(participatedVote);
    } else if (voteOption2) {
      await Vote.increment({ voteOption2Count: 1 }, { where: { id: voteId } });
      await User_vote.create({
        userId: 1,
        voteId,
        voteOption1: false,
        voteOption2: true,
      });
      const participatedVote = await Vote.findByPk(voteId, {
        attributes: [
          "id",
          "voteTitle",
          "voteOption1",
          "voteOption2",
          "voteOption1Count",
          "voteOption2Count",
          "createdAt",
          "User.nickname",
          "Category.categoryTitle",
        ],
        include: [
          { model: Category, attributes: ["categoryTitle"] },
          { model: User, attributes: ["nickname"] },
        ],
      });

      return res.status(200).json(participatedVote);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
