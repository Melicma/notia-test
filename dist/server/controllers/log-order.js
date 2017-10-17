"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var csrf_1 = require("../middlewares/csrf");
var tools_1 = require("../helpers/tools");
var LogOrder = require("../models/log-order");
require("rxjs/add/operator/mergeMap");
var router = express_1.Router();
router.get('/', csrf_1.CsrfMiddleware, _get);
function _get(req, res) {
    LogOrder.getData().subscribe(function (data) {
        tools_1.Tools.sendJSON(res, true, data);
    }, function (err) {
        tools_1.Tools.sendJSON(res, false, err);
    });
}
// export router
exports.LogOrderController = router;
//# sourceMappingURL=log-order.js.map