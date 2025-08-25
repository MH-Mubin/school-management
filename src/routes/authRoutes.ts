import { Router } from 'express';
import { signup, login, refreshToken } from '../controllers/authController';
import { validationMiddleware } from '../middleware/validation';
import { SignupDto, LoginDto, RefreshTokenDto } from '../dto/auth.dto';

const router = Router();

router.post('/signup', validationMiddleware(SignupDto), signup);
router.post('/login', validationMiddleware(LoginDto), login);
router.post('/refresh', validationMiddleware(RefreshTokenDto), refreshToken);

export default router;
