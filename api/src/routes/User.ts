import { Request, Response, Router, NextFunction } from "express";
import { Models } from "../db";
import HttpException from "../exceptions/HttpException";
import { User as User_Type }  from "../models/User";

const router = Router();
const { User } = Models;

type UserParams = {
  userId: string;
};

type UserQuery = {};

type UserBody = {
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  email: string;
  mobile: string;
  address: string;
  imagenDePerfil: string | null;
  userType: string;
  suspended: boolean;
};

type RouteRequest = Request<UserParams, UserQuery, UserBody>;

router.get("/",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const result = await User.findAll()
        
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
  "/:email",
  async (req: Request<{email:string},{},{}>, res: Response, next: NextFunction) => {
    try {
      const { email } = req.params;

      const result = await User.findOne({
        where: {
          email 
        }

      }) as User_Type | null

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
      console.log(req.body)
      if ( req.body.email !== undefined ) {
        const result = await User.create(req.body);

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
        "mobile",
        "address",
        "imagenDePerfil",
        "userType",
        "suspended",
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
