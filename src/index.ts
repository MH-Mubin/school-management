// Add this to src/index.ts (save current changes first)
import app from './app';
import { sql } from './db';

const PORT = process.env.PORT || 4000;

async function connectDatabase() {
  try {
    console.log('Connecting to database...');
    await sql`SELECT 1`;
    console.log('Database connected successfully');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

async function startServer() {
  const dbConnected = await connectDatabase();
  if (!dbConnected) {
    console.error('Server startup aborted');
    process.exit(1);
  }
  
  const server = app.listen(PORT, () => {
    console.log(`School Management API running on port ${PORT}`);
    console.log(`API: http://localhost:${PORT}/api`);
    console.log('Ready to accept requests!');
  });
}

startServer().catch(console.error);