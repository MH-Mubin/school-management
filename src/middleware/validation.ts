import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export function validationMiddleware<T>(type: any): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToClass(type, req.body);
    validate(dto).then((errors) => {
      if (errors.length > 0) {
        const message = errors.map((error) => Object.values(error.constraints || {})).join(', ');
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: message,
        });
      } else {
        req.body = dto;
        next();
      }
    });
  };
}
