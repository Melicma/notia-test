import {Transaction} from "../helpers/transaction";
import {Observable} from "rxjs/Observable";
import {Db, ResultSet} from '../helpers/db';


export function getData(ean: number, transaction?: Transaction): Observable<any> {
  return Observable.create(observer => {
    Db.query('SELECT * FROM order_items WHERE order_ean = $1', [ean], transaction).subscribe(
      (data: ResultSet) => {
        observer.next(data.rows);
        observer.complete();
      },
      err =>  {
        observer.error(err);
        observer.complete();
      }
    );
  });
}

export function updateData(ean: number, amount: number, userEan: string,  transaction?: Transaction): Observable<any> {
  return Observable.create(observer => {
    Db.query('UPDATE order_items SET packed_by = $2, amount = GREATEST(0, amount - $3), date_packed = $4 WHERE ean = $1', [ean, userEan, amount, new Date()], transaction).subscribe(
      (data: ResultSet) => {
        observer.next('Dotaz probehl.');
        observer.complete();
      }, err => {
        observer.error(err);
        observer.complete();
      }
    );
  });
}


export function updateOrderData(ean: number, userEan: number, transaction?: Transaction): Observable<any> {
  return Observable.create(observer => {
    Db.query('UPDATE orders SET state = $4, date_changed = $1, changed_by = $2 WHERE ean = $3', [new Date(), userEan, ean, 'CLOSED'], transaction).subscribe(
      (data: ResultSet) => {
        observer.next('Dotaz update order probehl.');
        observer.complete();
      }, err => {
        observer.error(err);
        observer.complete();
    }
    );
  });
}
