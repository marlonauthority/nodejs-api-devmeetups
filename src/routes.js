import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import OwnerMeetup from './app/controllers/OwnerMeetup';
import SubscriptionController from './app/controllers/SubscriptionController';

import validadeUserStore from './app/validators/UserStore';
import validadeUserUpdate from './app/validators/UserUpdate';
import validadeSessionStore from './app/validators/SessionStore';
import validadeMeetupStore from './app/validators/MeetupStore';
import validadeMeetupUpdate from './app/validators/MeetupUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', validadeUserStore, UserController.store);
routes.post('/sessions', validadeSessionStore, SessionController.store);

// -> As rotas abaixo irão obrigatóriamente usar o middleware
routes.use(authMiddleware);
routes.put('/users', validadeUserUpdate, UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', validadeMeetupStore, MeetupController.store);
routes.put('/meetups/:id', validadeMeetupUpdate, MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

routes.get('/meetups/owner', OwnerMeetup.index);
routes.get('/subscriptions', SubscriptionController.index);
routes.post('/meetups/:meetupId/subscription', SubscriptionController.store);
routes.delete(
  '/meetups/:meetupId/cancelsubscription',
  SubscriptionController.delete
);

export default routes;
