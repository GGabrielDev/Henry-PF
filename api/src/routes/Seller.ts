import { Request, Response, Router, NextFunction } from "express";
import { Models } from "../db";
import HttpException from "../exceptions/HttpException";
import { User as User_Type } from "../models/User";

const router = Router();
const { Seller, User } = Models;

type SellerParams = {
  sellerId: string;
  userId: string;
  nombreUrl: string;
};

type SellerQuery = {};

type SellerBody = {
  nombreNegocio: string;
  description: string | null;
  imageLogo: string | null;
  template_page: string;
  suspended: boolean;
  categorias: string;
};

type RouteRequest = Request<SellerParams, SellerQuery, SellerBody>;

router.get(
  "/",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const result = await Seller.findAll();

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
  "/:sellerId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { sellerId } = req.params;

      const result = await Seller.findByPk(sellerId)
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
        throw new HttpException(404, "No seller is associated for this id");
      }
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/shop/:nombreUrl",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { nombreUrl } = req.params;

      const result = await Seller.findOne({
        where: {
          nombreUrl,
        },
      });

      if (!result) {
        return res.status(204).send("No entries have been found.");
      }

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:userId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      if (userId) {
        const user = (await User.findByPk(userId)) as User_Type | null;
        if (user) {
          await user.createSeller();
        }
        return res
          .status(201)
          .send(await User.findByPk(userId, { include: Seller }));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.put(
  "/:sellerId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { sellerId } = req.params;
      const possibleValues = [
        "nombreUrl",
        "nombreNegocio",
        "imageLogo",
        "categorias",
        "template_page",
        "suspended",
        "description",
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

      if (!sellerId) {
        throw new HttpException(400, "The Seller ID is missing in the request");
      }

      const result = await Seller.findByPk(sellerId)
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
        throw new HttpException(404, "The requested Seller doesn't exist");
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
  "/:sellerId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { sellerId } = req.params;

      if (!sellerId) {
        throw new HttpException(400, "The Seller ID is missing in the request");
      }
      const result = await Seller.findByPk(sellerId)
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
        throw new HttpException(404, "The requested Seller doesn't exist");
      }

      await result.destroy();

      res.status(200).send("The chosen Seller was deleted successfully");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
