import { Request, Response, Router, NextFunction } from "express";
import { Op } from "sequelize";
import { Models } from "../db";
import { Product_Amount as Product_Amount_Type } from "../models/Product_Amount";
import { Cart as Cart_Type } from "../models/Cart";
import HttpException from "../exceptions/HttpException";
import { nextTick } from "process";

const router = Router();
const {User, Product_Amount} = Models;

type Product_AmountParams = {
  ProductAmountId: string;
};

type Product_AmountQuery = {
  ProductAmountId: string;
};

type Product_AmountBody = {
  amount: number | null;
};

type RouteRequest = Request<Product_AmountParams, Product_AmountQuery, Product_AmountBody>;

router.get(
  "/:ProductAmountId",
  async(req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { ProductAmountId } = req.params;

      const result = await Product_Amount.findByPk(ProductAmountId)
      .then((value) => value)
      .catch((error) => {
        if (error.parent.code === "22P02") {
          throw new HttpException(
            400,
            "The format of the request is not UUID"
          );
        }
      });

    if (!result) {
      throw new HttpException(404, "No ProductAmount is associated for this id");
    }
    return res.status(200).send(result);
    } catch (error) {
      next(error);
  }
  }
);

router.post(
  "/",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { amount } = req.body;

      if (amount) {
        const result = await Product_Amount.create({
          amount,
        });

        return res.status(201).send(result);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.put(
  "/:ProductAmountId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { ProductAmountId } = req.params;
      const possibleValues = [
        "amount"
      ];
      const arrayBody = Object.entries(req.body).filter((value) =>
        possibleValues.find((possibleValue) => possibleValue === value[0])
      );

      if (arrayBody.length === 0) {
        throw new HttpException(
          400,
          "The request has no valid body parameters"
        );
      }

      const body = Object.fromEntries(arrayBody);

      if (!ProductAmountId) {
        throw new HttpException(400, "The Seller ID is missing in the request");
      }

      const result = await Product_Amount.findByPk(ProductAmountId)
        .then((value) => value)
        .catch((error) => {
          if (error.parent.code === "22P02") {
            throw new HttpException(
              400,
              "The format of the request is not UUID"
            );
          }
        });

      if (!result) {
        throw new HttpException(404, "The requested Product Amount doesn't exist");
      } else {
        result.set(body);
        await result.save();

        res.status(200).send(result);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.delete(
  "/:ProductAmountId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { ProductAmountId } = req.params;

      if (!ProductAmountId) {
        throw new HttpException(
          400,
          "The ProductAmount ID is missing in the request"
        );
      }
      const result = await Product_Amount.findByPk(ProductAmountId)
        .then((value) => value)
        .catch((error) => {
          if (error.parent.code === "22P02") {
            throw new HttpException(
              400,
              "The format of the request is not UUID"
            );
          }
        });

      if (!result) {
        throw new HttpException(404, "The requested ProductAmount doesn't exist");
      }

      await result.destroy();

      res.status(200).send("The choosed ProductAmount was deleted successfully");
    } catch (error) {
      next(error);
    }
  }
);


export default router;