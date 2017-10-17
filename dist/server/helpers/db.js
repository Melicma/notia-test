"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var Observable_1 = require("rxjs/Observable");
var util_1 = require("util");
var db_1 = require("../config/db");
var ResultSet = (function () {
    function ResultSet(queryResult) {
        this.m_rows = [];
        this.m_rows = queryResult.rows;
    }
    Object.defineProperty(ResultSet.prototype, "row", {
        get: function () {
            return !util_1.isNullOrUndefined(this.m_rows[0]) ? this.m_rows[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResultSet.prototype, "rows", {
        get: function () {
            return this.m_rows;
        },
        enumerable: true,
        configurable: true
    });
    return ResultSet;
}());
exports.ResultSet = ResultSet;
var Db = (function () {
    function Db() {
    }
    Db.query = function (sql, values, tr) {
        var _this = this;
        if (values === void 0) { values = []; }
        return Observable_1.Observable.create(function (observer) {
            if (!tr) {
                _this.s_pool.query(sql, values).then(function (result) {
                    observer.next(new ResultSet(result));
                    observer.complete();
                }, function (err) {
                    observer.error(err.message);
                    observer.complete();
                });
            }
            else {
                _this._getClient(tr).subscribe(// get connected client (either from transaction object or a new one from the pool)
                function (client) {
                    new Promise(function (resolve) {
                        if (tr.fresh)
                            resolve(client.query('BEGIN'));
                        else
                            resolve(Promise.resolve());
                    }).then(function () {
                        tr.fresh = false;
                        return client.query(sql, values); // execute the actual query
                    }).then(function (result) {
                        if (!tr.shouldCommit()) {
                            observer.next(new ResultSet(result));
                            observer.complete();
                        }
                        else {
                            client.query('COMMIT').then(function () {
                                observer.next(new ResultSet(result));
                                client.release();
                                observer.complete();
                            }).catch(function (err) {
                                throw err;
                            });
                        }
                    }).catch(function (err) {
                        client.query('ROLLBACK').then(function () {
                            client.release();
                            observer.error(err.message);
                            observer.complete();
                        }).catch(function (errRollback) {
                            client.release();
                            observer.error(errRollback.message + ' ~|~ ' + err.message);
                            observer.complete();
                        });
                    });
                }, function (err) {
                    observer.error(err);
                    observer.complete();
                });
            }
        });
    };
    Db._getClient = function (tr) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            if (tr && tr.connection) {
                observer.next(tr.connection);
                observer.complete();
            }
            else {
                _this.s_pool.connect().then(function (client) {
                    if (tr)
                        tr.connection = client; // set client to the transaction object
                    observer.next(client);
                    observer.complete();
                }, function (err) {
                    observer.error(err.message);
                    observer.complete();
                });
            }
        });
    };
    return Db;
}());
Db.s_pool = new pg_1.Pool({
    host: db_1.DbConfig.DB.HOST,
    user: db_1.DbConfig.DB.USER,
    password: db_1.DbConfig.DB.PASSWORD,
    database: db_1.DbConfig.DB.DATABASE,
    port: db_1.DbConfig.DB.PORT
});
exports.Db = Db;
//# sourceMappingURL=db.js.map