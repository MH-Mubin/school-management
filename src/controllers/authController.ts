import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema';
import { SignupDto, LoginDto, RefreshTokenDto } from '../dto/auth.dto';
import { asyncHandler } from '../middleware/errorHandler';

const generateTokens = (payload: { id: number; email: string; role: string }) => {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } as SignOptions
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' } as SignOptions
  );

  return { accessToken, refreshToken };
};

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role }: SignupDto = req.body;

  // Check if user already exists
  const existingUser = await db.select().from(users).where(eq(users.email, email));
  if (existingUser.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email',
    });
  }

  // Hash password
  const saltRounds = 12;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Create user
  const newUser = await db.insert(users).values({
    name,
    email,
    passwordHash,
    role,
  }).returning({
    id: users.id,
    name: users.name,
    email: users.email,
    role: users.role,
  });

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens({
    id: newUser[0].id,
    email: newUser[0].email,
    role: newUser[0].role,
  });

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: {
      user: newUser[0],
      accessToken,
      refreshToken,
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: LoginDto = req.body;

  // Find user
  const user = await db.select().from(users).where(eq(users.email, email));
  if (user.length === 0) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user[0].passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens({
    id: user[0].id,
    email: user[0].email,
    role: user[0].role,
  });

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
      },
      accessToken,
      refreshToken,
    },
  });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken }: RefreshTokenDto = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: 'Refresh token required',
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;
    
    // Verify user still exists
    const user = await db.select().from(users).where(eq(users.id, decoded.id));
    if (user.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    // Generate new tokens
    const tokens = generateTokens({
      id: user[0].id,
      email: user[0].email,
      role: user[0].role,
    });

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: tokens,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid refresh token',
    });
  }
});
