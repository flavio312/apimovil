import {Request, Response } from "express";
import Menu from "../models/menu.models";

export const getMenu = async (req: Request, res:Response): Promise<any> =>{
    try{
        const menu = await Menu.findAll();
        res.status(200).json(menu);
        console.log("Lista de productos");
    }catch(error){
        console.error("Error al obtener la lista de productos:", error);
        res.status(500).json({message:"Lista de productos no encontrados"})
    }
};

interface MulterRequest extends Request {
  file: File;
}

export const createMenu = async (req: MulterRequest, res: Response):Promise<any> =>{
    const {titulo, ingredientes, preparacion} = req.body;
    const file = req.file;

    console.log("Datos recibidos:", req.body);

    if (!preparacion || typeof preparacion !== "string") {
        return res.status(400).json({ message: "El campo 'preparacion' es obligatorio y debe ser texto válido." });
    }
    const cleanPreparacion = preparacion.trim();
    const imagePath = file ? file: null;

   try {
    const newMenu = await Menu.create({
        titulo, ingredientes, preparacion: cleanPreparacion, imagen: imagePath
    });
    const message = {
        action : "create",
        id: newMenu.getDataValue("id_Menu"),
        titulo,
        ingredientes,
        preparacion,
        imagen: imagePath
    }
    res.status(201).json({
        message: 'Plato agregado correctamente',
        data: newMenu
    });
    console.log("Plato creado con éxito:", message);
   } catch(error){
    console.error("Error al crear un platillo:", error);
    res.status(500).json({message:"Error al crear un platillo"});
   }
};

export const deleteMenu = async (req: Request, res: Response):Promise<any> => {
    const {id_Menu} = req.params;

    try{
        const deletedRows = await Menu.destroy({where: { id_Menu }});

        if(deletedRows === 0){
            return res.status(404).json({message:"Platillo no encontrado"});
        }

        const message = {action : 'delete', id_Menu};
        res.json({message:"Plato eliminado correctamente"});
        console.log("Plato eliminado con éxito:", message);
    }catch(error){
        console.error("Error al eliminar un platillo:", error);
        res.status(500).json({ message: "Error al eliminar el platillo" });;
    }
};

export const updateMenu = async (req: Request, res: Response):Promise<any> => {
    const { id_Menu } = req.params;
    const { titulo, ingredientes, preparacion, imagen} = req.body;

    if (!id_Menu) {
        return res.status(400).json({ message: "El campo 'id_Menu' es obligatorio." });
    }

    try {
        const [updatedRows] = await Menu.update(
            { titulo, ingredientes, preparacion, imagen },
            { where: { id_Menu } }
        );

        if (updatedRows === 0) {
            return res.status(404).json({ message: "Platillo no encontrado" });
        }

        const message = {
            action: 'update',
            id_Menu,
            titulo,
            ingredientes,
            preparacion, 
            imagen
        };
        res.json({ message: "Plato actualizado correctamente" });
        console.log("Plato actualizado con éxito:", message);
    } catch (error) {
        console.error("Error al actualizar un platillo:", error);
        res.status(500).json({ message: "Error al actualizar el platillo" });
    }
};