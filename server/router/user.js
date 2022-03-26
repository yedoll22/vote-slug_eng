const express = require("express");
require("express-async-errors");
// const bcrypt = require("bcrypt");
const router = express.Router();

router.route("/");

router.post("/", async (req, res, next) => {
  try {
    const { email, password, nickname, gender, dob } = req.body;
    const emailSerach = await User.findone({
      where: {
        email,
      },
    });
    if (emailSerach) {
      return res.status(409).send("email overlap");
    }
    const nicknameSerach = await User.findone({
      where: {
        nickname,
      },
    });
    if (nicknameSerach) {
      return res.status(409).send("nickname overlap");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      eemail,
      hashedPassword,
      nickname,
      gender,
      dob,
    });
    return res.status(201).send("User created");
  } catch (err) {
    return res.status(500).send("server error");
    next(err);
  }
});

// router.post(/login, controller.login);
// router.post(/logOut, controller.logOut);

// router.get(/profile, profile)
// router.get(/voted, voted)

// router.patch(/profile)

// router.delete(/profile)

// router.get();

module.exports = router;
