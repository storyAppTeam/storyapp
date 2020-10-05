const { User } = require("../../database/index.js").models;

module.exports = {
  register: async (req, res) => {
    const { email, nickname, birthDate, password } = req.body;

    try {
      const isNicknameExist = await User.findOne({
        where: { nickname },
        attributes: { exclude: ["password"] },
      });
      if (!!isNicknameExist) {
        return res.status(200).json({
          status: `failure`,
          msg: `Use diffrent nickname. ${nickname} exist.`,
        });
      }

      const isEmailExist = await User.findOne({
        where: { email },
        attributes: { exclude: ["password"] },
      });
      if (!!isEmailExist) {
        return res.status(200).json({
          status: `failure`,
          msg: `Use diffrent email. ${email} exist.`,
        });
      }

    } catch (err) {
      res.status(500).json({
        status: `failure`,
        msg: err,
      });
      throw err;
    }

    try {
      const addUser = await User.create({
        email,
        nickname,
        birthDate,
        password,
        salt: "something",
        avatar: null,
        language: "pl",
      });

      return res.status(200).json({
        status: `succes`,
        msg: `success register user ${nickname}`,
      });
    } catch (err) {
      res.status(500).json({
        status: `failure`,
        msg: err,
      });
      throw err;
    }
  },
};
