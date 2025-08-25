import { Router } from 'express';
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import { validationMiddleware } from '../middleware/validation';
import { CreateStudentDto, UpdateStudentDto } from '../dto/student.dto';
import { UserRole } from '../dto/auth.dto';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// POST /students - Create new student (admin only)
router.post(
  '/',
  authorizeRoles(UserRole.ADMIN),
  validationMiddleware(CreateStudentDto),
  createStudent
);

// GET /students - List all students (admin/teacher can view)
router.get(
  '/',
  authorizeRoles(UserRole.ADMIN, UserRole.TEACHER),
  getStudents
);

// GET /students/:id - Get student details
router.get(
  '/:id',
  authorizeRoles(UserRole.ADMIN, UserRole.TEACHER),
  getStudentById
);

// PUT /students/:id - Update student (admin only)
router.put(
  '/:id',
  authorizeRoles(UserRole.ADMIN),
  validationMiddleware(UpdateStudentDto),
  updateStudent
);

// DELETE /students/:id - Delete student (admin only)
router.delete(
  '/:id',
  authorizeRoles(UserRole.ADMIN),
  deleteStudent
);

export default router;
