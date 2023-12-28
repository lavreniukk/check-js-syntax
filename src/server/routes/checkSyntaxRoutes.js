import { Router } from 'express';
import { checkSyntax } from '../controller/checkController.js';
const router = Router();

router.post('/', checkSyntax);

export default router;