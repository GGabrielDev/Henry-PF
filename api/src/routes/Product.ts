import { Request, Response, Router, NextFunction } from "express";
import { Op } from "sequelize";
import { Models } from "../db";
import HttpException from "../exceptions/HttpException";
import { Category_Product as Category_Product_Type } from "../models/Category_product";
import { Review as Reviews_Type } from "../models/Review";
import { Product as Product_Type } from "../models/Product";
import { User as User_Type } from "../models/User";

const router = Router();
const { Product, Review, User } = Models;

type ProductParams = {
  productId: string;
  sellerId: string;
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
  reviews: Reviews_Type[];
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
        include: [
          Product.associations.categories,
          Product.associations.reviews,
        ],
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
  "/shop/:sellerId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { sellerId } = req.params;

      const result = await Product.findAll({
        where: {
          sellerId,
        },
        include: [Product.associations.categories],
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

      let result = await Product.findByPk(productId, {
        include: [
          Product.associations.categories,
          Product.associations.reviews,
        ],
      })
        .then((value) => value as Product_Type)
        .catch((error) => {
          console.log(error);
          throw new HttpException(
            500,
            "An error has occured getting the Product"
          );
        });

      if (!result)
        throw new HttpException(404, "The requested Product doesn't exist");

      if (result.reviews !== undefined && result.reviews.length > 0) {
        const newReviews = await Review.findAll({
          attributes: { exclude: ["productId", "userId"] },
          where: {
            id: result.reviews.map((review) => review.id),
          },
          include: [User],
        });

        const newProduct = {
          ...result.toJSON(),
          reviews: newReviews,
        };

        result = newProduct as Product_Type;
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
    console.log(req.body);
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

      if (name || description || price_local || suspended || categories) {
        const result = (await Product.create({
          name,
          description,
          price_dollar,
          price_local,
          stock,
          image,
          suspended,
          size,
        })) as Product_Type;

        console.log(result);
        result.addCategories(categories.map((value) => value.id));
        return res.status(201).send(
          await Product.findByPk(result.id, {
            include: [
              Product.associations.categories,
              Product.associations.reviews,
            ],
          })
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.post(
  "/:sellerId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    const {sellerId} = req.params
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

      if (name || description || price_local || suspended || categories) {
        const result = (await Product.create({
          name,
          description,
          price_dollar,
          price_local,
          stock,
          image,
          suspended,
          size,
        })) as Product_Type;
        result.setSeller(sellerId)
        result.addCategories(categories.map((value) => value.id));
        return res.status(201).send(
          await Product.findByPk(result.id, {
            include: [
              Product.associations.categories,
              Product.associations.reviews,
            ],
          })
        );
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

router.post(
  "/favorites",
  async (
    req: Request<{}, { userId: string; productId: string }, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId, productId } = req.query;
      if (!userId || !productId) {
        throw new HttpException(400, "faltan querys");
      }

      const user = (await User.findByPk(userId as string)) as User_Type | null;
      const product = (await Product.findByPk(
        productId as string
      )) as Product_Type | null;

      if (user === null || product === null) {
        throw new HttpException(404, "Usuario o producto no encontrado");
      } else {
        user.addFavoriteProduct(product);
      }

      //    return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
