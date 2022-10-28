import { Request, Response, Router, NextFunction } from "express";
import { Op } from "sequelize";
import { Models } from "../db";
import HttpException from "../exceptions/HttpException";

const router = Router();
const { Countries } = Models;

type CountriesParams = {
  countriesId: string;
};

type CountriesQuery = {
  name: string;
};

type CountriesBody = {
  name_spanish: string;
  name: string;
  code_cca3: string;
  mobile_zone: number;
  flag: string;
  code_currencies: string;
};

type RouteRequest = Request<CountriesParams, CountriesQuery, CountriesBody>;

router.get(
  "/",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { name } = req.query;

      const result = await Countries.findAll({
        where: name
          ? {
              name: {
                [Op.iLike]: `%${name}%`,
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
      const {
        name,
        name_spanish,
        code_cca3,
        mobile_zone,
        flag,
        code_currencies,
      } = req.body;

      if (
        name ||
        name_spanish ||
        code_cca3 ||
        mobile_zone ||
        code_currencies
      ) {
        const result = await Countries.create({
          name,
          name_spanish,
          code_cca3,
          mobile_zone,
          flag,
          code_currencies,
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
  "/:countriesId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { countriesId } = req.params;
      const possibleValues = [
        "name",
        "name_spanish",
        "code_cca3",
        "mobile_zone",
        "flag",
        "code_currencies",
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

      if (!countriesId) {
        throw new HttpException(
          400,
          "The Countries ID is missing in the request"
        );
      }

      const result = await Countries.findByPk(countriesId)
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
        throw new HttpException(404, "The requested Countries doesn't exist");
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
  "/:countriesId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { countriesId } = req.params;

      if (!countriesId) {
        throw new HttpException(
          400,
          "The Review ID is missing in the request"
        );
      }
      const result = await Countries.findByPk(countriesId)
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
        throw new HttpException(404, "The requested Countries doesn't exist");
      }

      await result.destroy();

      res.status(200).send("The choosed Countries was deleted successfully");
    } catch (error) {
      next(error);
    }
  }
);

export default router;

