require("dotenv").config();

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require('fs');

const session = require("express-session");
const uuidv4 = require("uuid").v4;
const FileStore = require("session-file-store")(session);
const passport = require("passport");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  session({
    genid: (req) => {
      return uuidv4();
    },
    store: new FileStore({
      ttl: 1000 * 60 * 60 * 24,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require("./routes/index.js");
app.use("/", indexRouter);

try {
  const path = `${__dirname}/sessions/`;
  if (fs.existsSync(path)) {
      fs.rmdirSync(path, { recursive: true, });
      fs.mkdir(path, { recursive: true }, (err) => {
          if (err) console.error(err);
      });
  }
} catch (err) {
  console.error(err);
}

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});