import { Request, Response, Router, NextFunction } from "express";
import { Models } from "../db";
import HttpException from "../exceptions/HttpException";

const router = Router();
const { Seller } = Models;

type SellerParams = {
  sellerId: string;
};

type SellerQuery = {};

type SellerBody = {
  nombreNegocio: string;
  pay_Money: string;
  imageLogo: string | null;
  template_page: string;
};

type RouteRequest = Request<SellerParams, SellerQuery, SellerBody>;

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

router.post(
  "/",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { nombreNegocio, pay_Money, imageLogo, template_page } = req.body;

      if (nombreNegocio || pay_Money || template_page) {
        const result = await Seller.create({
          nombreNegocio,
          pay_Money,
          imageLogo,
          template_page,
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
  "/:sellerId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { sellerId } = req.params;
      const possibleValues = [
        "nombreNegocio",
        "pay_Money",
        "imageLogo",
        "template_page",
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

      res.status(200).send("The choosed Seller was deleted successfully");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
