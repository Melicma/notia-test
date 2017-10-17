import {Router, Request, Response} from 'express';
import {CsrfMiddleware} from '../middlewares/csrf';
import {Tools} from '../helpers/tools';
import * as LogOrder from '../models/log-order'
import 'rxjs/add/operator/mergeMap';

const router: Router = Router();

router.get('/', CsrfMiddleware, _get);

function _get(req: Request, res: Response) {
  LogOrder.getData().subscribe(
    data => {
      Tools.sendJSON(res, true, data);
    },
    err => {
      Tools.sendJSON(res, false, err);
    }
  );
}

// export router
export const LogOrderController: Router = router;

