"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var db_1 = require("../helpers/db");
function getData(ean, transaction) {
    return Observable_1.Observable.create(function (observer) {
        db_1.Db.query('SELECT * FROM order_items WHERE order_ean = $1', [ean], transaction).subscribe(function (data) {
            observer.next(data.rows);
            observer.complete();
        }, function (err) {
            observer.error(err);
            observer.complete();
        });
    });
}
exports.getData = getData;
function updateData(ean, userEan, amount, transaction) {
    return Observable_1.Observable.create(function (observer) {
        db_1.Db.query('UPDATE order_items SET packed_by = $2, amount = GREATEST(0, amount - $3), date_packed = $4 WHERE ean = $1', [ean, userEan, amount, new Date()], transaction).subscribe(function (data) {
            observer.next('Dotaz probehl.');
            observer.complete();
        }, function (err) {
            observer.error(err);
            observer.complete();
        });
    });
}
exports.updateData = updateData;
//# sourceMappingURL=orders.js.map