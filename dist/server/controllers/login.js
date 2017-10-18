"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var csrf_1 = require("../middlewares/csrf");
var tools_1 = require("../helpers/tools");
var Login = require("../models/login");
require("rxjs/add/operator/mergeMap");
var router = express_1.Router();
router.get('/', csrf_1.CsrfMiddleware, _get);
router.get('/:userEan', csrf_1.CsrfMiddleware, _getUser);
function _get(req, res) {
    Login.getData().subscribe(function (data) {
        tools_1.Tools.sendJSON(res, true, data);
    }, function (err) {
        tools_1.Tools.sendJSON(res, false, err);
    });
}
function _getUser(req, res) {
    Login.getUser(req.params.userEan).subscribe(function (data) {
        tools_1.Tools.sendJSON(res, true, data);
    }, function (err) {
        tools_1.Tools.sendJSON(res, false, err);
    });
}
// export router
exports.LoginController = router;
//# sourceMappingURL=login.js.map