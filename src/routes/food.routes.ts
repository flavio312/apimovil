import express from "express";
import { upload } from "../config/multer.config";
import { createMenu, deleteMenu, getMenu, updateMenu } from "../controllers/menu.controller";

const router = express.Router()

router.get("/menu",getMenu);
router.post("/plato",upload.single("imagen"),createMenu);
router.delete("/plato/:id_Menu",deleteMenu);
router.put("/plato/:id_Menu",updateMenu)

export default router;