import { Request, Response } from 'express';
import User from '../models/user.models';

export const loginUser = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
  
    try {
      console.log('Email recibido:', email);
  
      const user = await User.findOne({ where: { email } });
      if (!user) {
        console.log('Usuario no encontrado');
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  };