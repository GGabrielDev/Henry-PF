import { NextFunction, Request, Response, Router } from "express";
import mercadopago from "mercadopago";
import { Currency } from "mercadopago/shared/currency";
import axios from "axios";
import { Models } from "../db";
import HttpException from "../exceptions/HttpException";
import { Product as ProductClass } from "../models/Product";

const { Recipt } = Models;

// EL ACCESS TOKEN VA EN .ENV PERO SE HARDCODEA POR EL MOMENTO
const { MERCADOPAGO_NOTIFICATION_URL, MERCADOPAGO_SELLER_ID } = process.env;
mercadopago.configure({
  access_token:
    MERCADOPAGO_SELLER_ID ||
    "TEST-6021195329730298-110520-c1b02f22c0cbfcbc82ce10a408365b0e-388312893",
});

/*
Test user N°1: 
{
    "id": 1233471778,
    "nickname": "TETE2335414",
    "password": "f2syUCuwVi",
    "site_status": "active",
    "site_id": "MLA",
    "description": "a description",
    "date_created": "2022-11-07T05:32:37-04:00",
    "date_last_updated": "2022-11-07T05:32:37-04:00"
}

Test user N°2:
{
    "id": 1233470117,
    "nickname": "TETE7841106",
    "password": "B6pY9MzZXs",
    "site_status": "active",
    "site_id": "MLA",
    "description": "a different description",
    "date_created": "2022-11-07T05:33:47-04:00",
    "date_last_updated": "2022-11-07T05:33:47-04:00"
}
*/

type GenerateRequestBody = {
  buyProducts: {
    product: ProductClass;
    amount: number;
  }[];
};

type NotificationRequestQuery = Record<"id" | "topic", string>;

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Recipt.findAll();

    if (result.length === 0) {
      return res.status(204);
    }
    return res.status(200).send({ amount: result.length, result });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:mercadopagoId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { mercadopagoId } = req.params;

      if (!mercadopagoId) {
        throw new HttpException(
          400,
          "The MercadoPago ID is missing in the request"
        );
      }

      const result = mercadopago.merchant_orders
        .findById(mercadopagoId)
        .then((res) => res.body);

      if (!result)
        throw new HttpException(
          404,
          "The requested MercadoPago order doesn't exist"
        );

      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.post(
  "/generate",
  async (
    req: Request<{}, {}, GenerateRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { buyProducts } = req.body;

    try {
      if (!(buyProducts instanceof Array) || buyProducts.length === 0) {
        throw new HttpException(
          400,
          "The request must have an array with products and their amounts"
        );
      }
      let preference = {
        back_urls: {
          success: "https://localhost:3001/tugamer",
        },
        items: buyProducts.map((value) => {
          return {
            title: value.product.name,
            description: value.product.description,
            unit_price: parseFloat(
              value.product.price_local as unknown as string
            ),
            quantity: value.amount,
            currency_id: "ARS" as Currency,
          };
        }),
        notification_url: `${MERCADOPAGO_NOTIFICATION_URL}/payment/notification`,
      };

      const payment = await mercadopago.preferences.create(preference);
      return res.status(201).json(payment.body);
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        next(error);
      } else {
        const newError = new HttpException(
          500,
          "Something went wrong with MercadoPago",
          error
        );
        next(newError);
      }
    }
  }
);

router.post(
  "/notification",
  async (
    req: Request<{}, NotificationRequestQuery, {}>,
    res: Response,
    next: NextFunction
  ) => {
    console.log(req.body);
    if (req.query.topic === "payment") {
      try {
        await Recipt.create({ mpOrderId: req.query.id });
        return res.status(201).send("Saved Order ID");
      } catch (error) {
        console.log(error);
        next(error);
      }
    } else {
      return res.status(200).send("Ignored");
    }
  }
);

export default router;
