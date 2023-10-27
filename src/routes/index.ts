import express from 'express';
import health from './health';
import users from './users.routes';
const router = express.Router();

router.use('/health', health);
router.use('/users', users);

export default router;
