import * as path from 'path';
import {Router, Response} from 'express';
import {CsrfMiddleware} from './middlewares/csrf';
import {TestController} from './controllers/test';
import {LoginController} from './controllers/login';
import {LogOrderController} from "./controllers/log-order";
import {OrdersController} from "./controllers/orders";

const router: Router = Router();
const appFile = (req: any, res: Response) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.sendFile(path.join(__dirname, '../client/index.html'));
};

// API routes
router.use('/api/test', TestController);
router.use('/api/login', LoginController);
router.use('/api/log-order', LogOrderController);
router.use('/api/orders', OrdersController);

// All other routes go to app file
router.get('*', CsrfMiddleware, appFile);

export const AppRouter: Router = router;
