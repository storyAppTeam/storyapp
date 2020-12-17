const { User } = require("../../database/index.js").models;
const { Op } = require("sequelize");

module.exports = {
  register: async (req, res) => {
    const { email, nickname, birthDate, password } = req.body;

    try {
      const isExist = await User.findAll({
        where: {
          [Op.or]: [{ nickname }, { email }],
        },
        attributes: ["email", "nickname"],
      });

      let duplicates={
        status: "failure",
      };
      if (isExist.filter((user) => user.dataValues.email === email).length > 0 ){
        duplicates.msgEmail = `Use diffrent email. ${email} are taken.`;

      }
      if (isExist.filter((user) => user.dataValues.nickname === nickname).length > 0) {
        duplicates.msgNickname = `Use diffrent nickname. ${nickname} are taken.`;
      }

      if(!!duplicates.msgNickname || !!duplicates.msgEmail){
        return res.status(200).json(duplicates);
      }


      // if (isExist.length > 0) {
      //   if (
      //     isExist.length === 2 ||
      //     (isExist[0].dataValues.email === email &&
      //       isExist[0].dataValues.nickname === nickname)
      //   ) {
      //     return res.status(200).json({
      //       status: `failure`,
      //       msg: `Use diffrent nickname and email. ${nickname} and ${email} are taken.`,
      //     });
      //   } else if (isExist.length === 1) {
      //     if (isExist[0].dataValues.email === email) {
      //       return res.status(200).json({
      //         status: `failure`,
      //         msg: `Use diffrent email. ${email} are taken.`,
      //       });
      //     } else if (
      //       isExist[0].dataValues.nickname === nickname
      //     ) {
      //       return res.status(200).json({
      //         status: `failure`,
      //         msg: `Use diffrent nickname. ${nickname} are taken.`,
      //       });
      //     }
      //   }
      // }
      console.log("++++++++++++++++++++++++");
      // return res.end("0");
    } catch (err) {
      res.status(500).json({
        status: `failure`,
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
      });
      throw err;
    }
  },
};
