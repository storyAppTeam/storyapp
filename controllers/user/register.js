
const User = require("../../database/index.js");

module.export =  {
  register: async (req, res) => {
    const { email, nickname, birthDate, password } = req.body;

    try {
      // console.log(User);

      const addUser = await User.create({
        email,
        nickname,
        //   birthDate,
        password,
        salt:"something",
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
        msg: `failure to register register user ${nickname}`,
      });
      throw err;
    }

    return res.json({ msg: "register" });
  },
};
