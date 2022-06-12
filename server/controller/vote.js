const jwt = require("jsonwebtoken");
const {
  User,
  Vote,
  Category,
  User_vote,
  Comment,
} = require("../database/models");

module.exports = {
  get: async (req, res) => {
    const { categoryId } = req.query;
    try {
      if (categoryId && categoryId !== "1") {
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
  },

  getById: async (req, res) => {
    const { authorization } = req.headers;
    const { voteId } = req.params;
    //GET
    try {
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

      if (authorization) {
        const accessToken = authorization.split(" ")[1];
        const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        const userId = userData.id;
        const participation = await User_vote.findOne({
          where: { userId, voteId },
        });

        if (participation)
          return res.status(200).json({ participation: true, selectedVote });
        else
          return res.status(200).json({ participation: false, selectedVote });
      }

      return res.status(200).json({ participation: false, selectedVote });
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },

  getComment: async (req, res) => {
    const { authorization } = req.headers;
    const { voteId } = req.params;
    try {
      const findComment = await Comment.findAll({
        where: { voteId },
        attributes: [
          "id",
          "content",
          "createdAt",
          "updatedAt",
          "userId",
          "User.nickname",
        ],
        include: [{ model: User, attributes: ["nickname"] }],
      });

      const commentList = findComment.map((comment) => {
        return {
          id: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          userId: comment.userId,
          nickname: comment.User.nickname,
          isMine: false,
        };
      });

      if (authorization) {
        const accessToken = authorization.split(" ")[1];
        const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        const userId = userData.id;

        const commentList = findComment.map((comment) => {
          if (comment.userId === userId)
            return {
              id: comment.id,
              content: comment.content,
              createdAt: comment.createdAt,
              updatedAt: comment.updatedAt,
              userId: comment.userId,
              nickname: comment.User.nickname,
              isMine: true,
            };
          else
            return {
              id: comment.id,
              content: comment.content,
              createdAt: comment.createdAt,
              updatedAt: comment.updatedAt,
              userId: comment.userId,
              nickname: comment.User.nickname,
              isMine: false,
            };
        });

        return res.status(200).json(commentList);
      }

      return res.status(200).json(commentList);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },

  getCommentById: async (req, res) => {
    const { commentId } = req.params;
    try {
      const findComment = await Comment.findByPk(commentId, {
        attributes: ["content"],
      });
      const { content } = findComment;

      return res.status(200).json({ content });
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },

  post: async (req, res) => {
    // userId 필요
    const userId = req.userId;
    const { voteTitle, categoryId, voteOption1, voteOption2 } = req.body;

    try {
      await Vote.create({
        userId,
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
  },

  postComment: async (req, res) => {
    // userId 필요
    const userId = req.userId;
    const { content, voteId } = req.body;

    try {
      await Comment.create({
        userId,
        content,
        voteId,
      });
      return res.sendStatus(201);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },

  patch: async (req, res) => {
    const userId = req.userId;
    const { voteId, voteOption1, voteOption2 } = req.body;
    try {
      if (voteOption1) {
        await Vote.increment(
          { voteOption1Count: 1 },
          { where: { id: voteId } }
        );
        await User_vote.create({
          userId,
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
        await Vote.increment(
          { voteOption2Count: 1 },
          { where: { id: voteId } }
        );
        await User_vote.create({
          userId,
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
      return res.sendStatus(500);
    }
  },

  patchComment: async (req, res) => {
    const { content, commentId } = req.body;
    console.log(commentId);
    try {
      await Comment.update({ content }, { where: { id: commentId } });
      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  delete: async (req, res) => {
    const { voteId } = req.params;

    try {
      await Vote.destroy({
        where: { id: voteId },
      });
      return res.status(200).json({ message: "deleted" });
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  deleteComment: async (req, res) => {
    const { commentId } = req.params;

    try {
      await Comment.destroy({
        where: { id: commentId },
      });
      return res.status(200).json({ message: "deleted" });
    } catch (err) {
      return res.sendStatus(500);
    }
  },
};
