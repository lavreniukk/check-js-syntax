import { Router } from 'express';
import { getJsFileContent } from '../controller/fileController.js';
const router = Router();

router.post('/', getJsFileContent);

export default router;