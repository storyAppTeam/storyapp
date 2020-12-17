const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../../database/index.js").models;
module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      await passport.use(
        new LocalStrategy(
          { usernameField: "email" },
          async (email, password, done) => {
            const findUser = await User.findOne({
              where: { email },
              attributes: ["UserID", "email", "password"],
            });

            if (!findUser) {
              return res.status(200).json({
                status: `failure`,
                msg: `failed login user with email ${email} does not exist`,
              });
            }
            const user = findUser.dataValues;
            if (!!user && bcrypt.compareSync(password, user.password)) {
              return done(null, user);
            }
          }
        )
      );

      passport.serializeUser((user, done) => {
        done(null, user.UserID);
      });
      await passport.authenticate("local", (err, user, info) => {
        req.login(user, (err) => {
          if (err) return console.error(err);
          return res.send("You were authenticated & logged in!\n");
        });
      })(req, res, next);

      passport.deserializeUser((email, done) => {
        done(null, email);
    });

      /////////////////////////////////////////////////////////////////

    } catch (err) {
      throw err;
    }
  },
};
