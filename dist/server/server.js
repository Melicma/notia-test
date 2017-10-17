"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var helmet = require("helmet");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var path = require("path");
var constants_1 = require("./config/constants");
var router_1 = require("./router");
var csrf_1 = require("./middlewares/csrf");
var app = express();
var port = constants_1.Constants.NODE_PORT;
var baseUrl = "http://localhost:" + port;
var sessionMiddleware = session({
    secret: 'SomeSecretKey',
    resave: false,
    saveUninitialized: true
});
// Setup middle-wares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // middleware to parse request body and expose it in req.body
app.use(helmet()); // security middleware
app.use(cookieParser('SuperSecretSomething'));
app.use(sessionMiddleware);
app.use(csrf_1.CsrfMiddleware);
app.use(express.static(path.join(__dirname, '../client'), { index: false }));
app.use('/assets', express.static(path.join(__dirname, '../client/assets'), { maxAge: 30 }));
app.use(router_1.AppRouter);
app.listen(port, function () {
    console.log("Listening at " + baseUrl);
});
//# sourceMappingURL=server.js.map