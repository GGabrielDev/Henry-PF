import { Router } from "express";
import ProductRouter from "./Product";
import UsersRouter from "./User";
import sellerRouter from "./Seller";
import categorySellerRouter from "./Category_Seller";
import categoryProductRouter from "./Category_Product";

const router = Router();

router.use("/products", ProductRouter);
router.use("/users", UsersRouter);
router.use("/sellers", sellerRouter);
router.use("/productCategory", categoryProductRouter);
router.use("/sellerCategory", categorySellerRouter);

export default router;
