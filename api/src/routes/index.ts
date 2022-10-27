import { Router } from "express";
import ProductRouter from "./Product";

const router = Router();

router.use("/products", ProductRouter);

export default router;
