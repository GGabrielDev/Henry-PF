import { Request, Response, Router, NextFunction } from "express";
import { Op } from "sequelize";
import { Models } from "../db";
import { Review as Review_Type } from "../models/Review";
import { User as User_Type } from "../models/User";
import { Product as Product_Type } from "../models/Product";
import HttpException from "../exceptions/HttpException";

const router = Router();
const { Product, Review, User } = Models;

type ReviewParams = {
  reviewId: string;
};

type ReviewQuery = {
  userId: string;
  productId: string;
};

type ReviewBody = {
  body: string;
  score: string;
};

type RouteRequest = Request<ReviewParams, ReviewQuery, ReviewBody>;

router.get(
  "/",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { body } = req.query;

      const result = await Review.findAll({
        where: body
          ? {
              body: {
                [Op.iLike]: `%${body}%`,
              },
            }
          : {},
      });

      if (result.length === 0) {
        throw new HttpException(404, "No entries has been found.");
      }
      return res.status(200).send({ amount: result.length, result });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { userId, productId } = req.query;
      const { body, score } = req.body;

      if (userId === undefined) {
        throw new HttpException(400, "UserId is missing in the query");
      }

      if (productId === undefined) {
        throw new HttpException(400, "ProductId is missing in the query");
      }

      if (body === undefined || score === undefined) {
        throw new HttpException(400, "Some elements are missing in the body");
      }

      const user = await User.findByPk(userId.toString())
        .then((value) => value as User_Type)
        .catch((error) => {
          if (error.parent.code === "22P02") {
            throw new HttpException(
              400,
              "The format of the request is not UUID"
            );
          }
        });

      if (!user) {
        throw new HttpException(404, "No User belongs to this ID");
      }

      const product = await Product.findByPk(productId.toString())
        .then((value) => value as Product_Type)
        .catch((error) => {
          if (error.parent.code === "22P02") {
            throw new HttpException(
              400,
              "The format of the request is not UUID"
            );
          }
        });

      if (!product) {
        throw new HttpException(404, "No Product belongs to this ID");
      }

      const review = (await Review.create({
        body,
        score,
      })) as Review_Type;
      console.log(review.toJSON());

      await product.addReview(review.id);
      await user.addReview(review.id);

      return res.status(201).send(
        await Review.findOne({
          attributes: {
            exclude: ["userId"],
          },
          where: {
            id: review.id,
          },
          include: User,
        })
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.put(
  "/:reviewId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { reviewId } = req.params;
      const possibleValues = ["body", "score"];
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

      if (!reviewId) {
        throw new HttpException(400, "The Review ID is missing in the request");
      }

      const result = await Review.findByPk(reviewId, {
        attributes: {
          exclude: ["userId"],
        },
        include: User,
      })
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
  "/:reviewId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { reviewId } = req.params;

      if (!reviewId) {
        throw new HttpException(400, "The Review ID is missing in the request");
      }
      const result = await Review.findByPk(reviewId)
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
        throw new HttpException(404, "The requested Review doesn't exist");
      }

      await result.destroy();

      res.status(200).send("The choosed Review was deleted successfully");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
