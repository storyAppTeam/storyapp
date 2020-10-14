const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../../database/index.js").models;
module.exports = {
  login: async (req, res, next) => {
    const { nickname, password } = req.body;
    // if (!!user && bcrypt.compareSync(password, user.dataValues.password)) {}
    //         const user = await User.findOne({
    //           where: { nickname },
    //           attributes: ["UserID", "nickname", "password"],
    //         });

    try {
      passport.use(
        new LocalStrategy(
          { usernameField: "nickname" },
          async (email, password, done) => {
            console.log("Inside local strategy callback");
            const findUser = await User.findOne({
              where: { nickname },
              attributes: ["UserID", "nickname", "password"],
            });
            const user = findUser.dataValues;
            if (
              !!user &&
              bcrypt.compareSync(password, user.password)
            ) {
              console.log("Local strategy returned true");
              return done(null, user);
            }
          }
        )
      );

      passport.serializeUser((user, done) => {
        console.log(
          "Inside serializeUser callback. User id is save to the session file store here"
        );
        done(null, user.UserID);
      });

      console.log("Inside POST /login callback");
      passport.authenticate("local", (err, user, info) => {
        console.log("Inside passport.authenticate() callback");
        console.log(
          `req.session.passport: ${JSON.stringify(req.session.passport)}`
        );
        console.log(`req.user: ${JSON.stringify(req.user)}`);
        req.login(user, (err) => {
          console.log("Inside req.login() callback");
          console.log(
            `req.session.passport: ${JSON.stringify(req.session.passport)}`
          );
          console.log(`req.user: ${JSON.stringify(req.user)}`);
          return res.send("You were authenticated & logged in!\n");
        });
      })(req, res, next);

      return res.end("dupa");

      /////////////////////////////////////////////////////////////////

      // const user = await User.findOne({
      //   where: { nickname },
      //   attributes: ['UserID', 'nickname', 'password']
      // });

      // if (!!user && bcrypt.compareSync(password, user.dataValues.password)) {
      //   const { UserID } = user.dataValues;

      //   console.log('Inside POST /login callback function')
      //   console.log(req.sessionID);

      //   return res.end('login')
      // const token = jwt.sign({ UserID, role: "user" }, process.env.JWT_KEY);

      // return res
      //   .cookie("token", token, {
      //     secure: process.env.NODE_ENV === "production",
      //     httpOnly: true,
      //     sameSite: true,
      //     maxAge: 1000 * 60 * 60 * 8,
      //   })
      //   .status(200)
      //   .json({
      //     status: "success",
      //     msg: `${nickname}! Welcome in our app.`,
      //   });
      // } else {
      //   return res.json({
      //     status: "failure",
      //     msg: "Wrong nickname or password",
      //   });
      // }
    } catch (err) {
      throw err;
    }
  },
};
