const { User, Vote, Category, User_vote } = require("../database/models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const salt = 12;

dotenv.config();

module.exports = {
  get: async (req, res) => {
    // authorization header 있는지 검증
    const { authorization } = req.headers;
    const { refreshToken } = req.cookies;
    try {
      if (!authorization && !refreshToken) return res.sendStatus(401);

      const accessToken = authorization.split(" ")[1];
      // Case ) accessToken은 undefined refresh는 있는 상태

      if (accessToken) {
        let userData = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        let userInfo = await User.findOne({ where: { id: userData.id } });

        if (!userInfo && !refreshToken)
          return res.status(401).json({ message: "token expired" });
        // accessToken은 만료 but refreshToken은 유효한 경우 -> accessToken 재발급
        else if (!userInfo && refreshToken) {
          userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
          const payload = { id: userData.id };
          const newAccessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
            expiresIn: "1d",
          });
          return res.status(200).json({ newAccessToken });
        }
        // accessToken은 유효 but refreshToken은 만료된 경우 -> refreshToken 재발급 후 쿠키 설정
        else if (userInfo && !refreshToken) {
          const payload = { id: userData.id };
          const newRefreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_KEY,
            {
              expiresIn: "30d",
            }
          );

          return res.status(200).cookie("refreshToken", newRefreshToken, {
            sameSite: "Lax",
            // secure: true,
            httpOnly: true,
          });
        }
      } else if (!accessToken) {
        const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
        const payload = { id: userData.id };
        const newAccessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
          expiresIn: "1d",
        });
        return res.status(200).json({ newAccessToken });
      }
      // accessToken이 없는경우에는 userInfo이 null값.

      //accessToken과 refreshToken이 둘 다 만료된 경우 401

      // 그 외의 경우 (accessToken과 refreshToken 둘 다 유효한 경우)
      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  getMypage: async (req, res) => {
    const userId = req.userId;
    try {
      userInfo = await User.findOne({ where: { id: userId } });
      const { id, email, nickname, gender, dob, createdAt } = userInfo;
      return res
        .status(200)
        .json({ id, email, nickname, gender, dob, createdAt });
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  patch: async (req, res) => {
    const userId = req.userId;
    console.log(userId);
    const { password, newPassword, nickname } = req.body;
    try {
      const userInfo = await User.findOne({ where: { id: userId } });
      console.log("----userInfo----", userInfo.nickname);
      const hashedPassword = userInfo.password;
      const match = await bcrypt.compare(password, hashedPassword);
      // 유저가 입력한 패스워드 검증
      if (!match) return res.status(401).json({ message: "wrong password" });
      // body로 newPassword가 들어왔을 때 비번 변경시켜줌.
      if (newPassword) {
        const newHashedPassword = await bcrypt.hash(newPassword, salt);
        await User.update(
          { password: newHashedPassword },
          { where: { id: userId } }
        );
        return res.sendStatus(200);
      }
      if (nickname) {
        await User.update({ nickname }, { where: { id: userId } });
        return res.sendStatus(200);
      }
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  signUp: async (req, res) => {
    const { email, password, nickname, gender, dob } = req.body;
    try {
      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password, salt);
      // email과 nickname 중복검사
      const emailResult = await User.findOne({ where: { email } });
      const nicknameResult = await User.findOne({ where: { nickname } });

      if (emailResult)
        return res.status(409).json({ message: "email overlap" });
      if (nicknameResult)
        return res.status(409).json({ message: "nickname overlap" });

      // email과 nickname 중복 아닐 시 정상적으로 db에 user정보 Insert
      await User.create({
        email,
        password: hashedPassword,
        nickname,
        gender,
        dob,
      });
      return res.sendStatus(201);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    console.log("email", email);
    console.log("password", password);
    try {
      // 가입된 이메일이 존재하는지 확인.
      const emailExist = await User.findOne({ where: { email: email } });
      if (!emailExist) return res.status(401).json({ message: "wrong email" });
      // 비밀번호 검증 // 해당 이메일의 비밀번호가 일치하는지 확인.
      console.log("emailexist", emailExist);
      const hashedPassword = emailExist.password;
      const id = emailExist.id;
      const match = await bcrypt.compare(password, hashedPassword);
      if (!match) return res.status(401).json({ message: "wrong password" });

      // 회원 정보 일치 확인 -> jwt발급해줌.
      const payload = { id };

      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
        expiresIn: "1d",
      });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
        expiresIn: "30d",
      });

      return res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          sameSite: "None",
          secure: true,
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30d
        })
        .json({
          accessToken: accessToken,
          message: "login complete",
        });
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },

  logout: async (req, res) => {
    res.clearCookie("refreshToken");
    return res
      .status(200)
      .json({ message: "logout complete" })
      .redirect("/login");
  },

  getMyVote: async (req, res) => {
    const userId = req.userId;
    const { type, categoryId } = req.query;
    // type이 posted인경우 && categoryId를 쿼리로 받은 경우
    try {
      if (type === "posted" && categoryId) {
        const createdVoteList = await Vote.findAll({
          where: { userId, categoryId },
          attributes: [
            "id", // voteId
            "voteTitle",
            "voteOption1",
            "voteOption2",
            "voteOption1Count",
            "voteOption2Count",
            "createdAt",
            "User.nickname", // author
            "Category.categoryTitle",
          ],
          include: [
            { model: Category, attributes: ["categoryTitle"] },
            { model: User, attributes: ["nickname"] },
          ],
        });

        return res.status(200).json({ createdVoteList });
      } else if (type === "participated" && categoryId) {
        const query = await User_vote.findAll({
          where: { userId },
          attributes: [
            "voteOption1", // boolean 자기가 어디 투표했는지
            "voteOption2", // boolean 자기가 어디 투표했는지
            "Vote.voteTitle",
            "Vote.voteOption1Count",
            "Vote.voteOption2Count",
            "Vote.createdAt",
            "Vote.voteOption1", // 투표항목 1
            "Vote.voteOption2", // 투표항목 2
            "Vote.Category.categoryTitle",
          ],
          include: [
            {
              model: Vote,
              where: { categoryId },
              include: [
                {
                  model: Category,
                  attributes: ["categoryTitle"],
                },
                { model: User, attributes: ["nickname"] },
              ],
            },
          ],
        });

        const participatedVoteList = query.map((el) => {
          return {
            id: el.Vote.id,
            voteTitle: el.Vote.voteTitle,
            voteOption1: el.voteOption1,
            voteOption2: el.voteOption2,
            voteOption1Count: el.Vote.voteOption1Count,
            voteOption2Count: el.Vote.voteOption2Count,
            createdAt: el.Vote.createdAt,
            Category: { categoryTitle: el.Vote.Category.categoryTitle },
            User: { nickname: el.Vote.User.nickname },
          };
        });

        return res.status(200).json({ participatedVoteList });
      } else if (type === "posted") {
        const createdVoteList = await Vote.findAll({
          where: { userId },
          attributes: [
            "id", // voteId
            "voteTitle",
            "voteOption1",
            "voteOption2",
            "voteOption1Count",
            "voteOption2Count",
            "createdAt",
            "User.nickname", // author
            "Category.categoryTitle",
          ],
          include: [
            { model: Category, attributes: ["categoryTitle"] },
            { model: User, attributes: ["nickname"] },
          ],
        });

        return res.status(200).json({ createdVoteList });
      } else if (type === "participated") {
        const query = await User_vote.findAll({
          where: { userId },
          attributes: [
            "voteOption1", // boolean 자기가 어디 투표했는지
            "voteOption2", // boolean 자기가 어디 투표했는지
            "Vote.voteTitle",
            "Vote.voteOption1Count",
            "Vote.voteOption2Count",
            "Vote.createdAt",
            "Vote.voteOption1", // 투표항목 1
            "Vote.voteOption2", // 투표항목 2
          ],
          include: [
            {
              model: Vote,
              include: [
                { model: Category, attributes: ["categoryTitle"] },
                { model: User, attributes: ["nickname"] },
              ],
            },
          ],
        });
        const participatedVoteList = query.map((el) => {
          return {
            id: el.Vote.id,
            voteTitle: el.Vote.voteTitle,
            voteOption1: el.voteOption1,
            voteOption2: el.voteOption2,
            voteOption1Count: el.Vote.voteOption1Count,
            voteOption2Count: el.Vote.voteOption2Count,
            createdAt: el.Vote.createdAt,
            Category: { categoryTitle: el.Vote.Category.categoryTitle },
            User: { nickname: el.Vote.User.nickname },
          };
        });

        return res.status(200).json({ participatedVoteList });
      }
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },

  delete: async (req, res) => {
    const userId = req.userId;
    try {
      await User.destroy({ where: { id: userId } });
      res.clearCookie("refreshToken");
      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
};
