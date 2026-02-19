import { Router } from 'express';
import { userService } from '../services/userService.js';
import * as userController from '../controllers/userController.js'; // L'extension .js est vitale ici

const router = Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

export default router;