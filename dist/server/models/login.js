"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var db_1 = require("../helpers/db");
function getData(transaction) {
    return Observable_1.Observable.create(function (observer) {
        db_1.Db.query('SELECT ean FROM users', [], transaction).subscribe(function (data) {
            observer.next(data.rows);
            observer.complete();
        }, function (err) {
            observer.error(err);
            observer.complete();
        });
    });
}
exports.getData = getData;
function getUser(ean, transaction) {
    return Observable_1.Observable.create(function (observer) {
        db_1.Db.query('SELECT * FROM users WHERE ean = $1', [ean], transaction).subscribe(function (data) {
            observer.next(data.rows);
            observer.complete();
        }, function (err) {
            observer.error(err);
            observer.complete();
        });
    });
}
exports.getUser = getUser;
//# sourceMappingURL=login.js.map