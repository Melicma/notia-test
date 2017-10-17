"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var csrf_1 = require("../middlewares/csrf");
var tools_1 = require("../helpers/tools");
var Test = require("../models/test");
require("rxjs/add/operator/mergeMap");
var router = express_1.Router();
// define '/api/test/*' routes here
router.get('/', csrf_1.CsrfMiddleware, _get);
// router.post('/', CsrfMiddleware, _post);
// define route-handlers here
function _get(req, res) {
    Test.getTestData().subscribe(function (data) {
        tools_1.Tools.sendJSON(res, true, data);
    }, function (err) {
        tools_1.Tools.sendJSON(res, false, err);
    });
}
// export router
exports.TestController = router;
//# sourceMappingURL=test.js.map