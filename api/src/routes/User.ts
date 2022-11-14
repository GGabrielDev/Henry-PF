import { Request, Response, Router, NextFunction } from "express";
import { Models } from "../db";
import HttpException from "../exceptions/HttpException";

const router = Router();
const { User } = Models;

type UserParams = {
  userId: string;
  email:string;
};

type UserQuery = {};

type UserBody = {
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  email: string;
  phoneNumber: string;
  address: string;
  imagenDePerfil: string | null;
  
};

type RouteRequest = Request<UserParams, UserQuery, UserBody>;

router.get(
  "/:email",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { email } = req.params;

      const result = await User.findOne({where: {email}})
      if (!result) {
        throw new HttpException(404, "No User belongs to this email");
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
        firstName,
        lastName,
        username,
        gender,
        email,
        phoneNumber,
        address,
        imagenDePerfil,
      } = req.body;

      if (
        email 
      ) {
        const result = await User.create({
          firstName,
          lastName,
          username,
          gender,
          email,
          phoneNumber,
          address,
          imagenDePerfil,
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
  "/:userId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const possibleValues = [
        "firstName",
        "lastName",
        "username",
        "gender",
        "email",
        "phoneNumber",
        "address",
        "imagenDePerfil"
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

      if (!userId) {
        throw new HttpException(400, "The User ID is missing in the request");
      }

      const result = await User.findByPk(userId)
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
        throw new HttpException(404, "The requested User doesn't exist");
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
  "/:userId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        throw new HttpException(400, "The User ID is missing in the request");
      }

      const result = await User.findByPk(userId)
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
        throw new HttpException(404, "The requested User doesn't exist");
      }

      await result.destroy();

      res.status(200).send("The choosed User was deleted successfully");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
