import { Response } from 'express';
import { eq, desc } from 'drizzle-orm';
import { db } from '../db';
import { classes, students } from '../db/schema';
import { CreateClassDto, UpdateClassDto } from '../dto/class.dto';
import { EnrollStudentDto } from '../dto/student.dto';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

export const createClass = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name, section }: CreateClassDto = req.body;

  const newClass = await db.insert(classes).values({
    name,
    section,
  }).returning();

  res.status(201).json({
    success: true,
    message: 'Class created successfully',
    data: newClass[0],
  });
});

export const getClasses = asyncHandler(async (req: AuthRequest, res: Response) => {
  const classesList = await db
    .select()
    .from(classes)
    .orderBy(desc(classes.createdAt));

  res.json({
    success: true,
    message: 'Classes retrieved successfully',
    data: classesList,
  });
});

export const getClassById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const classData = await db.select().from(classes).where(eq(classes.id, parseInt(id)));

  if (classData.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Class not found',
    });
  }

  res.json({
    success: true,
    message: 'Class retrieved successfully',
    data: classData[0],
  });
});

export const updateClass = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateClassDto = req.body;

  const existingClass = await db.select().from(classes).where(eq(classes.id, parseInt(id)));
  if (existingClass.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Class not found',
    });
  }

  const updatedClass = await db
    .update(classes)
    .set({
      ...updateData,
      updatedAt: new Date(),
    })
    .where(eq(classes.id, parseInt(id)))
    .returning();

  res.json({
    success: true,
    message: 'Class updated successfully',
    data: updatedClass[0],
  });
});

export const deleteClass = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const existingClass = await db.select().from(classes).where(eq(classes.id, parseInt(id)));
  if (existingClass.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Class not found',
    });
  }

  // Check if there are students enrolled in this class
  const enrolledStudents = await db.select().from(students).where(eq(students.classId, parseInt(id)));
  if (enrolledStudents.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Cannot delete class with enrolled students. Please transfer students first.',
    });
  }

  await db.delete(classes).where(eq(classes.id, parseInt(id)));

  res.json({
    success: true,
    message: 'Class deleted successfully',
  });
});

export const enrollStudent = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params; // class id
  const { studentId }: EnrollStudentDto = req.body;

  // Check if class exists
  const classExists = await db.select().from(classes).where(eq(classes.id, parseInt(id)));
  if (classExists.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Class not found',
    });
  }

  // Check if student exists
  const studentExists = await db.select().from(students).where(eq(students.id, studentId));
  if (studentExists.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Student not found',
    });
  }

  // Enroll student in class
  const updatedStudent = await db
    .update(students)
    .set({
      classId: parseInt(id),
      updatedAt: new Date(),
    })
    .where(eq(students.id, studentId))
    .returning();

  res.json({
    success: true,
    message: 'Student enrolled successfully',
    data: updatedStudent[0],
  });
});

export const getClassStudents = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  // Check if class exists
  const classExists = await db.select().from(classes).where(eq(classes.id, parseInt(id)));
  if (classExists.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Class not found',
    });
  }

  // Get students in the class
  const classStudents = await db
    .select({
      id: students.id,
      name: students.name,
      age: students.age,
      createdAt: students.createdAt,
    })
    .from(students)
    .where(eq(students.classId, parseInt(id)))
    .orderBy(desc(students.createdAt));

  res.json({
    success: true,
    message: 'Class students retrieved successfully',
    data: {
      class: classExists[0],
      students: classStudents,
      totalStudents: classStudents.length,
    },
  });
});
