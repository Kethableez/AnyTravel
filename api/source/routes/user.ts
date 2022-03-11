import { Router } from 'express';
import controller from './../controllers/user';

const router = Router();

router.post('/register', controller.createUser);
router.post('/login', controller.login);

export = router;
