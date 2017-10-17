"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction = (function () {
    function Transaction() {
        this.m_connection = null;
        this.m_commit = false;
        this.m_fresh = true;
    }
    Transaction.prototype.commit = function () {
        this.m_commit = true;
        return this;
    };
    Object.defineProperty(Transaction.prototype, "connection", {
        get: function () {
            return this.m_connection;
        },
        set: function (con) {
            this.m_connection = con;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "fresh", {
        get: function () {
            return this.m_fresh;
        },
        set: function (fresh) {
            this.m_fresh = fresh;
        },
        enumerable: true,
        configurable: true
    });
    Transaction.prototype.shouldCommit = function () {
        return this.m_commit;
    };
    return Transaction;
}());
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map