import {Router, Request, Response} from 'express';
import {CsrfMiddleware} from "../middlewares/csrf";
import * as Order from '../models/orders';
import {Tools} from "../helpers/tools";
import 'rxjs/add/operator/mergeMap';

const router: Router = Router();

router.get('/:orderEan', CsrfMiddleware, _get);
router.put('/:itemEan', CsrfMiddleware, _put);
router.put('/complete/:itemEan', CsrfMiddleware, _putComplete);

// toDO kdyz bude post => hodnota je v req.body!!!

function _get(req: Request, res: Response){
  Order.getData(req.params.orderEan).subscribe(
    data => {
      Tools.sendJSON(res, true, data);
    },
    err => {
      Tools.sendJSON(res, false, err);
    }
  );
}

function _put(req: Request, res: Response) {
  Order.updateData(req.params.itemEan, req.body[0], req.body[1]).subscribe(
    data => {
      Tools.sendJSON(res, true, data);
    },
    err => {
      Tools.sendJSON(res, false, err);
    }
  );
}

function _putComplete(req: Request, res: Response) {
  Order.updateOrderData(req.params.itemEan, req.body[0]).subscribe(
    data => {
      Tools.sendJSON(res, true, data);
    }, err => {
      Tools.sendJSON(res, false, err);
    }
  );
}

// export router
export const OrdersController: Router = router;

