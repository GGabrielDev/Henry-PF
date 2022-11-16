import { Request, Response, Router, NextFunction } from "express";
import { Op } from "sequelize";
import { Models } from "../db";
import { Customer_Orders as Customer_Orders_Type } from "../models/Customer_Orders";
import { User as User_Type } from "../models/User";
import { Cart as Cart_Type } from "../models/Cart";
import HttpException from "../exceptions/HttpException";
import { nextTick } from "process";

const router = Router();
const {User, Customer_Orders} = Models;

type Customer_OrdersParams = {
  CustomerOrdersId: string;
};

type Customer_OrdersQuery = {
  userId: string;
};

type Customer_OrdersBody = {
  destination: string;
  destination_person: string;
  sale_date: Date;
  total_price: number | null;
};

type RouteRequest = Request<Customer_OrdersParams, Customer_OrdersQuery, Customer_OrdersBody>;

router.get(
  "/:CustomerOrdersId",
  async(req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { CustomerOrdersId } = req.params;

      const result = await Customer_Orders.findByPk(CustomerOrdersId)
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
      throw new HttpException(404, "No customer_order is associated for this id");
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
      const { destination, destination_person, sale_date, total_price } = req.body;

      if (destination || destination_person || sale_date|| total_price) {
        const result = await Customer_Orders.create({
          destination,
          destination_person,
          sale_date,
          total_price,
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
  "/:CustomerOrdersId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { CustomerOrdersId } = req.params;
      const possibleValues = [
        "destination",
        "destination_person",
        "sale_date",
        "total_price",
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

      if (!CustomerOrdersId) {
        throw new HttpException(400, "The Seller ID is missing in the request");
      }

      const result = await Customer_Orders.findByPk(CustomerOrdersId)
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
  "/:CustomerOrdersId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { CustomerOrdersId } = req.params;

      if (!CustomerOrdersId) {
        throw new HttpException(
          400,
          "The CustomerOrders ID is missing in the request"
        );
      }
      const result = await Customer_Orders.findByPk(CustomerOrdersId)
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
        throw new HttpException(404, "The requested CustomerOrders doesn't exist");
      }

      await result.destroy();

      res.status(200).send("The choosed CustomerOrders was deleted successfully");
    } catch (error) {
      next(error);
    }
  }
);


export default router;