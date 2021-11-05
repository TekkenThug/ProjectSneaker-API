import express from 'express';
import sneakerRoute from './sneakers.route.js';
import authRoute from './auth.route.js';
import adminRoute from './admin.route.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/sneakers',
    route: sneakerRoute,
  },

  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
