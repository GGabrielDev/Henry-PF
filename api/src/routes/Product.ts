import { Request, Response, Router, NextFunction } from "express";
import { Op } from "sequelize";
import { Models } from "../db";
import HttpException from "../exceptions/HttpException";
import { Category_Product as Category_Product_Type } from "../models/Category_product"
import { Product as Product_Type } from "../models/Product"

const router = Router();
const { Product, Category_Product } = Models;

type ProductParams = {
  productId: string;
};

type ProductQuery = {
  name: string;
};

type ProductBody = {
  name: string;
  description: string;
  price_dollar: number | null;
  price_local: number;
  stock: number | null;
  image: string | null;
  suspended: boolean;
  size: string | null;
  categories: Category_Product_Type[];
};

type RouteRequest = Request<ProductParams, ProductQuery, ProductBody>;

router.get(
  "/",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { name } = req.query;

      const result = await Product.findAll({
        where: name
          ? {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          }
          : {},
      });

      if (result.length === 0) {
        return res.status(204).send("No entries have been found.");
      }
      return res.status(200).send({ amount: result.length, result });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:productId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;

      if (!productId) {
        throw new HttpException(
          400,
          "The Product ID is missing in the request"
        );
      }

      const result = await Product.findByPk(productId, {
        include: Product.associations.categories,
      })
        .then((value) => value)
        .catch((error) => {
          console.log(error);
          throw new HttpException(
            500,
            "An error has occured getting the Product"
          );
        });

      if (!result)
        throw new HttpException(404, "The requested Product doesn't exist");

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
        description,
        price_dollar,
        price_local,
        stock,
        image,
        suspended,
        size,
        categories,
      } = req.body;

      if (
        name ||
        description ||
        price_local ||
        suspended ||
        categories
      ) {
        const result = await Product.create({
          name,
          description,
          price_dollar,
          price_local,
          stock,
          image,
          suspended,
          size,
        }) as Product_Type;
        // result.addCategories(categories.map(value => value.id))
        return res.status(201).send(await Product.findByPk(result.id ));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.put(
  "/:productId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;
      const possibleValues = [
        "name",
        "description",
        "price_dolar",
        "price_local",
        "stock",
        "image",
        "suspended",
        "size",
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

      if (!productId) {
        throw new HttpException(
          400,
          "The Product ID is missing in the request"
        );
      }

      const result = await Product.findByPk(productId)
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
        throw new HttpException(404, "The requested Product doesn't exist");
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
  "/:productId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;

      if (!productId) {
        throw new HttpException(
          400,
          "The Product ID is missing in the request"
        );
      }
      const result = await Product.findByPk(productId)
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
        throw new HttpException(404, "The requested Product doesn't exist");
      }

      await result.destroy();

      res.status(200).send("The chosen Product was deleted successfully");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
