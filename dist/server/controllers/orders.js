"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var csrf_1 = require("../middlewares/csrf");
var Order = require("../models/orders");
var tools_1 = require("../helpers/tools");
require("rxjs/add/operator/mergeMap");
var router = express_1.Router();
router.get('/:orderEan', csrf_1.CsrfMiddleware, _get);
router.put('/:itemEan', csrf_1.CsrfMiddleware, _put);
router.put('/complete/:itemEan', csrf_1.CsrfMiddleware, _putComplete);
// toDO kdyz bude post => hodnota je v req.body!!!
function _get(req, res) {
    Order.getData(req.params.orderEan).subscribe(function (data) {
        tools_1.Tools.sendJSON(res, true, data);
    }, function (err) {
        tools_1.Tools.sendJSON(res, false, err);
    });
}
function _put(req, res) {
    Order.updateData(req.params.itemEan, req.body[0], req.body[1]).subscribe(function (data) {
        tools_1.Tools.sendJSON(res, true, data);
    }, function (err) {
        tools_1.Tools.sendJSON(res, false, err);
    });
}
function _putComplete(req, res) {
    Order.updateOrderData(req.params.itemEan, req.body[0]).subscribe(function (data) {
        tools_1.Tools.sendJSON(res, true, data);
    }, function (err) {
        tools_1.Tools.sendJSON(res, false, err);
    });
}
// export router
exports.OrdersController = router;
//# sourceMappingURL=orders.js.map