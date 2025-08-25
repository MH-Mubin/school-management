import { Response } from 'express';
import { eq, desc, asc, sql } from 'drizzle-orm';
import { db } from '../db';
import { students, classes } from '../db/schema';
import { CreateStudentDto, UpdateStudentDto } from '../dto/student.dto';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

export const createStudent = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name, age, classId }: CreateStudentDto = req.body;

  // If classId is provided, verify it exists
  if (classId) {
    const classExists = await db.select().from(classes).where(eq(classes.id, classId));
    if (classExists.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Class not found',
      });
    }
  }

  const newStudent = await db.insert(students).values({
    name,
    age,
    classId: classId || null,
  }).returning();

  res.status(201).json({
    success: true,
    message: 'Student created successfully',
    data: newStudent[0],
  });
});

export const getStudents = asyncHandler(async (req: AuthRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  // Get total count
  const totalResult = await db.select({ count: sql<number>`count(*)` }).from(students);
  const total = totalResult[0].count;

  // Get students with pagination
  const studentsList = await db
    .select({
      id: students.id,
      name: students.name,
      age: students.age,
      classId: students.classId,
      className: classes.name,
      classSection: classes.section,
      createdAt: students.createdAt,
    })
    .from(students)
    .leftJoin(classes, eq(students.classId, classes.id))
    .orderBy(desc(students.createdAt))
    .limit(limit)
    .offset(offset);

  res.json({
    success: true,
    message: 'Students retrieved successfully',
    data: {
      students: studentsList,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
});

export const getStudentById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const student = await db
    .select({
      id: students.id,
      name: students.name,
      age: students.age,
      classId: students.classId,
      className: classes.name,
      classSection: classes.section,
      createdAt: students.createdAt,
      updatedAt: students.updatedAt,
    })
    .from(students)
    .leftJoin(classes, eq(students.classId, classes.id))
    .where(eq(students.id, parseInt(id)));

  if (student.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Student not found',
    });
  }

  res.json({
    success: true,
    message: 'Student retrieved successfully',
    data: student[0],
  });
});

export const updateStudent = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateStudentDto = req.body;

  // Check if student exists
  const existingStudent = await db.select().from(students).where(eq(students.id, parseInt(id)));
  if (existingStudent.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Student not found',
    });
  }

  // If classId is provided, verify it exists
  if (updateData.classId) {
    const classExists = await db.select().from(classes).where(eq(classes.id, updateData.classId));
    if (classExists.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Class not found',
      });
    }
  }

  const updatedStudent = await db
    .update(students)
    .set({
      ...updateData,
      updatedAt: new Date(),
    })
    .where(eq(students.id, parseInt(id)))
    .returning();

  res.json({
    success: true,
    message: 'Student updated successfully',
    data: updatedStudent[0],
  });
});

export const deleteStudent = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const existingStudent = await db.select().from(students).where(eq(students.id, parseInt(id)));
  if (existingStudent.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Student not found',
    });
  }

  await db.delete(students).where(eq(students.id, parseInt(id)));

  res.json({
    success: true,
    message: 'Student deleted successfully',
  });
});
