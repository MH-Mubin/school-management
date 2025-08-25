import bcrypt from 'bcryptjs';
import { db } from '../db';
import { users, classes, students } from '../db/schema';

async function seed() {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await db.delete(students);
    await db.delete(classes);
    await db.delete(users);

    // Create users
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    const seedUsers = await db.insert(users).values([
      {
        name: 'Admin User',
        email: 'admin@school.com',
        passwordHash: hashedPassword,
        role: 'admin',
      },
      {
        name: 'John Teacher',
        email: 'teacher@school.com',
        passwordHash: hashedPassword,
        role: 'teacher',
      },
      {
        name: 'Jane Teacher',
        email: 'jane.teacher@school.com',
        passwordHash: hashedPassword,
        role: 'teacher',
      },
      {
        name: 'Student User',
        email: 'student@school.com',
        passwordHash: hashedPassword,
        role: 'student',
      },
    ]).returning();

    console.log(`Created ${seedUsers.length} users`);

    // Create classes
    const seedClasses = await db.insert(classes).values([
      {
        name: 'Mathematics',
        section: 'A',
      },
      {
        name: 'Mathematics',
        section: 'B',
      },
      {
        name: 'Science',
        section: 'A',
      },
      {
        name: 'English',
        section: 'A',
      },
      {
        name: 'History',
        section: 'A',
      },
    ]).returning();

    console.log(`Created ${seedClasses.length} classes`);

    // Create students
    const seedStudents = await db.insert(students).values([
      {
        name: 'Alice Johnson',
        age: 15,
        classId: seedClasses[0].id, // Math A
      },
      {
        name: 'Bob Smith',
        age: 16,
        classId: seedClasses[0].id, // Math A
      },
      {
        name: 'Charlie Brown',
        age: 14,
        classId: seedClasses[1].id, // Math B
      },
      {
        name: 'Diana Prince',
        age: 15,
        classId: seedClasses[2].id, // Science A
      },
      {
        name: 'Edward Wilson',
        age: 17,
        classId: seedClasses[2].id, // Science A
      },
      {
        name: 'Fiona Davis',
        age: 16,
        classId: seedClasses[3].id, // English A
      },
      {
        name: 'George Miller',
        age: 15,
        classId: seedClasses[3].id, // English A
      },
      {
        name: 'Hannah Taylor',
        age: 14,
        classId: seedClasses[4].id, // History A
      },
      {
        name: 'Ian Anderson',
        age: 16,
        classId: null, // Not enrolled in any class
      },
      {
        name: 'Julia Roberts',
        age: 15,
        classId: null, // Not enrolled in any class
      },
    ]).returning();

    console.log(`Created ${seedStudents.length} students`);

    console.log('Database seeding completed successfully!');
    console.log('\nSeed Data Summary:');
    console.log('Users:');
    console.log('  - admin@school.com (Admin) - password: password123');
    console.log('  - teacher@school.com (Teacher) - password: password123');
    console.log('  - jane.teacher@school.com (Teacher) - password: password123');
    console.log('  - student@school.com (Student) - password: password123');
    console.log(`\nClasses: ${seedClasses.length} classes created`);
    console.log(`Students: ${seedStudents.length} students created`);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
