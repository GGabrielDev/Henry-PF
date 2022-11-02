import { Request, Response, Router, NextFunction } from "express";
import { Op } from "sequelize";
import { Models } from "../db";
import HttpException from "../exceptions/HttpException";

const router = Router();
const { Review } = Models;

type ReviewParams = {
  reviewId: string;
};

type ReviewQuery = {
  body: string;
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
        throw new HttpException(404, "No entries have been found.");
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
      const {
        body,
        score,
      } = req.body;

      if (
        body ||
        score
      ) {
        const result = await Review.create({
          body,
          score,
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
  "/:reviewId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { reviewId } = req.params;
      const possibleValues = [
        "body",
        "score",
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

      if (!reviewId) {
        throw new HttpException(
          400,
          "The Review ID is missing in the request"
        );
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
        throw new HttpException(
          400,
          "The Review ID is missing in the request"
        );
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

