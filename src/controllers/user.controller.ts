import { Request, Response } from "express";
import User from "../models/user.models";

export const getUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
        console.log('Usuarios encontrados');
    } catch (error) {
        res.status(500).json({ message: "Usuarios no encontrados" });
    }
};

export const createUser = async (req:Request, res:Response):Promise<any>=>{
    const {name, email, password} = req.body;

    try {
      
        const newUser = await User.create({
            name,
            email,
            password
        });
        
        const message = {
            action: 'create',
            id: newUser.getDataValue('id_User'),
            name,
            email,
            password
        }


        res.status(201).json({
            message: 'Usuario creado exitosamente',
            data: newUser,

        });
        console.log("Usuario creado con éxito:", message);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario" });
        console.log(error);
    }
};

export const deleteUser = async (req:Request, res:Response):Promise<any> =>{
    const {id} = req.body;  

    try {
    const deletedRows = await User.destroy({ where: { id_Usuario: id } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const message = {
      action: 'delete',
      id
    };

    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateUser = async (req:Request, res:Response):Promise<any> =>{
    const {id} = req.params;
    const {name, email, password} = req.body;

    try{
       
        const [affectedRows] = await User.update(
            {name, email, password: password},
            {where: {id_User:id}}
        )

        if(affectedRows ===0){
            return res.status(404).json({message:"Usuario no encontrado"})
        }

        const message = {
            action: 'update',
            id,
            name,
            email,
            password
        }
        res.json({
            message: "Usuario actualizado correctamente",
            data:{id, name}
        });
    }catch(error){
        res.status(500).json({message:"Error al actualizar el usuario: ",error});
    }
};