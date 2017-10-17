"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tools;
(function (Tools) {
    function sendJSON(res, success, result) {
        res.json({ success: success, result: result });
    }
    Tools.sendJSON = sendJSON;
})(Tools = exports.Tools || (exports.Tools = {}));
//# sourceMappingURL=tools.js.map