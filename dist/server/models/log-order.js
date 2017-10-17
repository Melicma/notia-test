"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var db_1 = require("../helpers/db");
function getData(transaction) {
    return Observable_1.Observable.create(function (observer) {
        db_1.Db.query('SELECT ean FROM orders', [], transaction).subscribe(function (data) {
            observer.next(data.rows);
            observer.complete();
        }, function (err) {
            observer.error(err);
            observer.complete();
        });
    });
}
exports.getData = getData;
//# sourceMappingURL=log-order.js.map