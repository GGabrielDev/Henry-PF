import { Request, Response, Router, NextFunction } from "express";
import { Models } from "../db";
import HttpException from "../exceptions/HttpException";

const router = Router();
const { Category_Seller } = Models;

type Category_SellerParams = {
  categorySellerId: string;
};

type Category_SellerQuery = {};

type Category_SellerBody = {
    name: string;
    image: string;
};

type RouteRequest = Request<Category_SellerParams, Category_SellerQuery, Category_SellerBody>;

router.get(
  "/:categorySellerId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { categorySellerId } = req.params;

      const result = await Category_Seller.findByPk(categorySellerId)
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
        throw new HttpException(404, "No category belongs to this ID");
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
      const {
        name,
        image,
      } = req.body;

      if (
        name ||
        image
      ) {
        const result = await Category_Seller.create({
            name,
            image,
        });

        return res.status(201).send(result);
      } else {
        throw new HttpException(
          400,
          "There's required entries missing in the request's body"
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.put(
  "/:categorySellerId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { categorySellerId } = req.params;
      const possibleValues = [
        "name",
        "image",
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

      if (!categorySellerId) {
        throw new HttpException(400, "The category ID is missing in the request");
      }

      const result = await Category_Seller.findByPk(categorySellerId)
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
        throw new HttpException(404, "The requested category doesn't exist");
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
  "/:categorySellerId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { categorySellerId } = req.params;

      if (!categorySellerId) {
        throw new HttpException(400, "The category ID is missing in the request");
      }

      const result = await Category_Seller.findByPk(categorySellerId)
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
        throw new HttpException(404, "The requested category doesn't exist");
      }

      await result.destroy();

      res.status(200).send("The chosen category was deleted successfully");
    } catch (error) {
      next(error);
    }
  }
);

export default router;