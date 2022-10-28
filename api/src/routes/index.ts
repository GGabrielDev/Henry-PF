import { Router } from "express";
import ProductRouter from "./Product";
import UsersRouter from "./User";

const router = Router();

router.use("/products", ProductRouter);
router.use("/users", UsersRouter);

export default router;
