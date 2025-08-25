import { Router } from 'express';
import {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
  enrollStudent,
  getClassStudents,
} from '../controllers/classController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import { validationMiddleware } from '../middleware/validation';
import { CreateClassDto, UpdateClassDto } from '../dto/class.dto';
import { EnrollStudentDto } from '../dto/student.dto';
import { UserRole } from '../dto/auth.dto';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// POST /classes - Create new class (admin only)
router.post(
  '/',
  authorizeRoles(UserRole.ADMIN),
  validationMiddleware(CreateClassDto),
  createClass
);

// GET /classes - List all classes
router.get(
  '/',
  authorizeRoles(UserRole.ADMIN, UserRole.TEACHER),
  getClasses
);

// GET /classes/:id - Get class details
router.get(
  '/:id',
  authorizeRoles(UserRole.ADMIN, UserRole.TEACHER),
  getClassById
);

// PUT /classes/:id - Update class (admin only)
router.put(
  '/:id',
  authorizeRoles(UserRole.ADMIN),
  validationMiddleware(UpdateClassDto),
  updateClass
);

// DELETE /classes/:id - Delete class (admin only)
router.delete(
  '/:id',
  authorizeRoles(UserRole.ADMIN),
  deleteClass
);

// POST /classes/:id/enroll - Enroll a student to a class (admin/teacher)
router.post(
  '/:id/enroll',
  authorizeRoles(UserRole.ADMIN, UserRole.TEACHER),
  validationMiddleware(EnrollStudentDto),
  enrollStudent
);

// GET /classes/:id/students - Get students of a class
router.get(
  '/:id/students',
  authorizeRoles(UserRole.ADMIN, UserRole.TEACHER),
  getClassStudents
);

export default router;
