import {Observable} from 'rxjs/Observable';
import {Transaction} from '../helpers/transaction';
import {Db, ResultSet} from '../helpers/db';

export function getData(transaction?: Transaction): Observable<any> {
  return Observable.create(observer => {
    Db.query('SELECT ean FROM orders', [], transaction).subscribe(
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
