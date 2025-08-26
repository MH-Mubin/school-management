const bcrypt = require('bcryptjs');
const { db } = require('../db');
const { users, classes, students } = require('../db/schema');

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
        name: 'Jane Student',
        email: 'student@school.com',
        passwordHash: hashedPassword,
        role: 'student',
      },
    ]).returning();

    console.log('Users created:', seedUsers.length);

    // Create classes
    const seedClasses = await db.insert(classes).values([
      {
        name: 'Mathematics',
        section: 'A',
      },
      {
        name: 'Science',
        section: 'B',
      },
      {
        name: 'English',
        section: 'A',
      },
    ]).returning();

    console.log('Classes created:', seedClasses.length);

    // Create students
    const seedStudents = await db.insert(students).values([
      {
        name: 'Alice Johnson',
        age: 16,
        classId: seedClasses[0].id,
      },
      {
        name: 'Bob Smith',
        age: 17,
        classId: seedClasses[1].id,
      },
      {
        name: 'Charlie Brown',
        age: 15,
        classId: seedClasses[0].id,
      },
      {
        name: 'Diana Prince',
        age: 16,
        classId: seedClasses[2].id,
      },
      {
        name: 'Edward Norton',
        age: 17,
        classId: seedClasses[1].id,
      },
    ]).returning();

    console.log('Students created:', seedStudents.length);

    console.log('Database seeding completed successfully!');
    console.log('\n Summary:');
    console.log(`- Users: ${seedUsers.length}`);
    console.log(`- Classes: ${seedClasses.length}`);
    console.log(`- Students: ${seedStudents.length}`);
    console.log('\n Login credentials:');
    console.log('Admin: admin@school.com / password123');
    console.log('Teacher: teacher@school.com / password123');
    console.log('Student: student@school.com / password123');

  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  }
}

seed().then(() => {
  console.log('Seeding process completed');
  process.exit(0);
}).catch((error) => {
  console.error('Seeding process failed:', error);
  process.exit(1);
});
