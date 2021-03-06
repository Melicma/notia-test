import {Router, Request, Response} from 'express';
import {CsrfMiddleware} from '../middlewares/csrf';
import {Tools} from '../helpers/tools';
import {Transaction} from '../helpers/transaction';
import * as Login from '../models/login';
import 'rxjs/add/operator/mergeMap';

const router: Router = Router();

router.get('/', CsrfMiddleware, _get);
router.get('/:userEan', CsrfMiddleware, _getUser);

function _get(req: Request, res: Response) {
  Login.getData().subscribe(
    data => {
      Tools.sendJSON(res, true, data);
    },
    err => {
      Tools.sendJSON(res, false, err);
    }
  );
}

function _getUser(req: Request, res: Response) {
  Login.getUser(req.params.userEan).subscribe(
    data => {
      Tools.sendJSON(res, true, data);
    },
    err => {
      Tools.sendJSON(res, false, err);
    }
  );
}

// export router
export const LoginController: Router = router;

