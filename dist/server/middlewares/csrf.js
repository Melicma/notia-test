"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csrf = require("csurf");
var csrfProtection = csrf({ cookie: true });
exports.CsrfMiddleware = csrfProtection;
//# sourceMappingURL=csrf.js.map