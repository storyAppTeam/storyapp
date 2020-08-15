import dotenv from "dotenv"; dotenv.config();

import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import indexRouter from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, }));
app.use(cookieParser());
app.use(bodyParser.json())
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});