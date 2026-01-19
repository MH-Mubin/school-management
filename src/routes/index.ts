import { Router } from 'express';
import authRoutes from './authRoutes';
import studentRoutes from './studentRoutes';
import classRoutes from './classRoutes';

const router = Router();

// Base API endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'School Management API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login',
        refresh: 'POST /api/auth/refresh',
      },
      students: {
        create: 'POST /api/students',
        list: 'GET /api/students',
        getById: 'GET /api/students/:id',
        update: 'PUT /api/students/:id',
        delete: 'DELETE /api/students/:id',
      },
      classes: {
        create: 'POST /api/classes',
        list: 'GET /api/classes',
        getById: 'GET /api/classes/:id',
        enroll: 'POST /api/classes/:id/enroll',
        getStudents: 'GET /api/classes/:id/students',
      },
    },
  });
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'School Management API is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/students', studentRoutes);
router.use('/classes', classRoutes);

export default router;
