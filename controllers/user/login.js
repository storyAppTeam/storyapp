const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { models } = require("../../database/index.js");

module.exports = {
  login: async (req, res) => {
    const { nickname, password } = req.body;
    try {
      const isNicknameExist = await models.User.findOne({
        where: { nickname },
      });

      if (
        !!isNicknameExist &&
        bcrypt.compareSync(password, isNicknameExist.dataValues.password)
      ) {
        const { UserID } = isNicknameExist.dataValues;
        const token = jwt.sign({ UserID, role: "user" }, process.env.JWT_KEY);

        return res
          .cookie("token", token, {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: true,
            maxAge: 1000 * 60 * 60 * 8,
          })
          .status(200)
          .json({
            status: "success",
            msg: `${nickname}! Welcome in our app.`,
          });
      } else {
        return res.json({
          status: "failure",
          msg: "Wrong nickname or password",
        });
      }
    } catch (err) {
      throw err;
    }
  },
};
