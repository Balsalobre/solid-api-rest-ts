import { Request, Response, NextFunction } from 'express';
import { ICreateUserRequestDTO } from '../useCases/CreateUser/CreateUserDTO';

export function validateCreateUser(req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body as ICreateUserRequestDTO;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ message: 'El nombre es obligatorio y debe tener al menos 2 caracteres.' });
  }
  if (!email || typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ message: 'El email es obligatorio y debe ser válido.' });
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: 'La contraseña es obligatoria y debe tener al menos 6 caracteres.' });
  }

  next();
}
