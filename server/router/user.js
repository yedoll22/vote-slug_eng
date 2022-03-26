const express = require("express");
require("express-async-errors");
const { User, Vote, Category, User_vote } = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();

// GET (회원정보 조회)
router.get("/", async (req, res) => {
  // authorization header 있는지 검증
  const { authorization } = req.headers;
  const { refreshToken } = req.cookies;
  try {
    if (!authorization) return res.sendStatus(401);

    const accessToken = authorization.split(" ")[1];
    let userData = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    let userInfo = await User.findOne({ where: { id: userData.id } });

    //accessToken과 refreshToken이 둘 다 만료된 경우 401
    if (!userInfo && !refreshToken)
      return res.status(401).json({ message: "token expired" });
    // accessToken은 만료 but refreshToken은 유효한 경우 -> accessToken 재발급
    else if (!userInfo && refreshToken) {
      userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
      const payload = { id: userData.id };
      const newAccessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY);
      userInfo = await User.findOne({ where: { id: userData.id } });
      return res.status(200).json({ newAccessToken, userInfo });
    }
    // accessToken은 유효 but refreshToken은 만료된 경우 -> refreshToken 재발급
    else if (userInfo && !refreshToken) {
      const payload = { id: userData.id };
      const newRefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY);
      return res.status(200).json({ newRefreshToken, userInfo });
    }
    // 그 외의 경우 (accessToken과 refreshToken 둘 다 유효한 경우)
    else {
      return res.status(200).json({ userInfo });
    }
  } catch (err) {
    return res.sendStatus(500);
  }
});

// PATCH (회원정보 수정)
router.patch("/", async (req, res) => {
  const { authorization } = req.headers;
  const { refreshToken } = req.cookies;
  const { password, newPassword, nickname } = req.body;
  try {
    if (!authorization) return res.sendStatus(401);

    const accessToken = authorization.split(" ")[1];
    let userData = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    let userInfo = await User.findOne({ where: { id: userData.id } });

    //accessToken과 refreshToken이 둘 다 만료된 경우 401
    if (!userInfo && !refreshToken)
      return res.status(401).json({ message: "token expired" });
    // accessToken은 만료 but refreshToken은 유효한 경우 -> accessToken 재발급
    else if (!userInfo && refreshToken) {
      userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
      // 유저가 입력한 패스워드 검증
      const isMatchPassword = await User.findOne({
        where: { id: userData.id, password },
      });
      if (!isMatchPassword)
        return res.status(401).json({ message: "wrong password" });

      const payload = { id: userData.id };
      const newAccessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY);

      // body로 newPassword가 들어왔을 때 비번 변경시켜줌.
      if (newPassword)
        await User.update(
          { password: newPassword },
          {
            where: { id: userData.id },
          }
        );
      else if (nickname)
        await User.update(
          { nickname },
          {
            where: { id: userData.id },
          }
        );
      // 클라이언트에서 accessToken을 newAccessToken으로 갱신시켜줘야함.
      return res.status(200).json({ newAccessToken });
    }

    // accessToken은 유효 but refreshToken은 만료된 경우 -> refreshToken 재발급
    else if (userInfo && !refreshToken) {
      const payload = { id: userData.id };
      const newRefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY);

      // 비밀번호 일치 확인
      const isMatchPassword = await User.findOne({
        where: { id: userData.id, password },
      });

      if (!isMatchPassword)
        return res.status(401).json({ message: "wrong password" });

      if (newPassword)
        await User.update(
          { password: newPassword },
          {
            where: { id: userData.id },
          }
        );
      else if (nickname)
        await User.update(
          { nickname },
          {
            where: { id: userData.id },
          }
        );

      // 새로운 refreshToken을 쿠키에 업데이트 시켜준다.
      return res
        .cookie("refreshToken", newRefreshToken, {
          sameSite: "none",
          // secure: true,
          httpOnly: true,
        })
        .sendStatus(200);
    }
    // 그 외의 경우 (accessToken과 refreshToken 둘 다 유효한 경우)
    else {
      if (newPassword)
        await User.update(
          { password: newPassword },
          {
            where: { id: userData.id },
          }
        );
      else if (nickname)
        await User.update(
          { nickname },
          {
            where: { id: userData.id },
          }
        );
      return res.sendStatus(200);
    }
  } catch (err) {
    return res.sendStatus(500);
  }
});

// DELETE (회원 탈퇴)
router.delete("/", async (req, res) => {
  // authorization header 있는지 검증
  const { authorization } = req.headers;
  const { refreshToken } = req.cookies;
  try {
    if (!authorization) return res.sendStatus(401);

    const accessToken = authorization.split(" ")[1];
    let userData = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    let userInfo = await User.findOne({ where: { id: userData.id } });

    //accessToken과 refreshToken이 둘 다 만료된 경우 401
    if (!userInfo && !refreshToken)
      return res.status(401).json({ message: "token expired" });
    // accessToken은 만료 but refreshToken은 유효한 경우 -> refreshToken으로 조회해서 탈퇴처리
    else if (!userInfo && refreshToken) {
      userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
      await User.destroy({ where: { id: userData.id } });
      res.clearCookie("refreshToken"); // 회원탈퇴시 쿠키토큰삭제
      return res.status(200).redirect("/");
    }
    // accessToken은 유효 but refreshToken은 만료된 경우 & 그 외의 경우 (accessToken과 refreshToken 둘 다 유효한 경우)
    else {
      await User.destroy({ where: { id: userData.id } });
      res.clearCookie("refreshToken"); // 회원탈퇴시 쿠키토큰삭제
      return res.status(200).redirect("/");
    }
  } catch (err) {
    return res.sendStatus(500);
  }
});

// POST (회원가입)
router.post("/", async (req, res) => {
  const { email, password, nickname, gender, dob } = req.body;

  try {
    // email과 nickname 중복검사
    const emailResult = await User.findOne({ where: { email } });
    const nicknameResult = await User.findOne({ where: { nickname } });

    if (!emailResult) return res.status(409).json({ message: "email overlap" });
    if (!nicknameResult)
      return res.status(409).json({ message: "nickname overlap" });

    // email과 nickname 중복 아닐 시 정상적으로 db에 user정보 Insert
    await User.create({
      email,
      password,
      nickname,
      gender,
      dob,
    });

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

// 로그인 요청 (/user/login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 가입된 이메일이 존재하는지 확인.
    const emailExist = await User.findOne({ where: { email } });
    if (!emailExist) return res.status(401).json({ message: "wrong email" });

    // 해당 이메일의 비밀번호가 일치하는지 확인.
    const user = await User.findOne({ where: { email, password } });
    if (!user) return res.status(401).json({ message: "wrong password" });

    // 회원 정보 일치 확인 -> jwt발급해줌.
    const payload = { id: user.id };

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: "30d",
    });

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        sameSite: "none",
        // secure: true,
        httpOnly: true,
      })
      .json({
        accessToken: accessToken,
        message: "login complete",
      });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

// 로그아웃 요청 (/user/logout)
router.post("/logout", async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({ message: "logout complete" }).redirect("/");
});

module.exports = router;
