const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../database/index.js").models;

module.exports = {
  login: async (req, res) => {
    const { nickname, password } = req.body;
    try {
      const user = await User.findOne({
        where: { nickname },
      });

      if (!!user && bcrypt.compareSync(password, user.dataValues.password)) {
        const { UserID } = user.dataValues;
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
