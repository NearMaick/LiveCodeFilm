import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

import validatorUserStore from './app/validators/User/store';
import validatorUserUpdate from './app/validators/User/update';
import validatorSessionStore from './app/validators/SessionStore';

const routes = new Router();

routes.post('/users', validatorUserStore, UserController.store);
routes.post('/sessions', validatorSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', validatorUserUpdate, UserController.update);
routes.delete('/users', UserController.delete);

export default routes;
