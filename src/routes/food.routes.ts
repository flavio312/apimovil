import express from "express";
import { createMenu, deleteMenu, getMenu } from "../controllers/menu.controller";

const router = express.Router()

router.get("/menu",getMenu);
router.post("/plato",createMenu);
router.delete("/plato",deleteMenu);

export default router;