import express from "express";
import { createMenu, deleteMenu, getMenu, updateMenu } from "../controllers/menu.controller";

const router = express.Router()

router.get("/menu",getMenu);
router.post("/plato",createMenu);
router.delete("/plato/delete/:id_Menu",deleteMenu);
router.put("/plato/update/:id_Menu",updateMenu)

export default router;