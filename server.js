require("dotenv").config();

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const uuidv4 = require("uuid").v4;
const FileStore = require("session-file-store")(session);
const passport = require("passport");

const indexRouter = require("./routes/index.js");

// const initializeDatabaseConnection = require('./database/index.js').initializeDatabaseConnection;

const app = express();

app.use(express.json());

app.use(
  session({
    genid: (req) => {
      return uuidv4();
    },
    store: new FileStore(),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

///////////////////////////////////////////////////
// const LocalStrategy = require("passport-local").Strategy;
// const user = {
//   id: "1",
//   nickname: "Dark1",
//   passwors: "WielkaDupa1!",
// };

// passport.serializeUser((user, done) => {
//   console.log(
//     "Inside serializeUser callback. User id is save to the session file store here"
//   );
//   console.log(user);
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   const _user = user.id === id ? user : false;
//   done(null, _user);
// });

// passport.use(
//   new LocalStrategy(
//     { usernameField: "nickname" },
//     async (nickname, password, done) => {
//       console.log("Inside local strategy callback");
// 		console.log(user);
//       if (nickname === user.nickname && password === user.password) {
//         console.log("Local strategy returned true");
//         return done(null, user);
//       } else {
//         console.log("Local strategy returned false");
//         return done(null, false);
//       }
//     }
//   )
// );
////////////////////////////////
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});

// initializeDatabaseConnection();
