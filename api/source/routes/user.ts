import { Router } from 'express';
import JWTValidator from '../middleware/jwt-validator';
import controller from './../controllers/user';

const router = Router();

router.post('/register', controller.createUser);
router.post('/login', controller.login);
router.get('/data', JWTValidator, controller.getUserData);
router.post('/availability', controller.availability);

export = router;
