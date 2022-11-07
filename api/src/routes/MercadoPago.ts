import { Request, Response, Router } from "express";
import mercadopago from "mercadopago";
import { Currency } from "mercadopago/shared/currency";
import HttpException from "../exceptions/HttpException";
import { Product as ProductClass } from "../models/Product";

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

type GenerateRequestParams = {
  buyProducts: {
    product: ProductClass;
    amount: number;
  }[];
};

type NotificationRequestBody =
  | {
      resource: string;
      topic: string;
    }
  | {
      action: string;
      api_version: string;
      data: {
        id: string;
      };
      date_created: Date;
      id: number;
      live_mode: boolean;
      type: string;
      user_id: string;
    };

const router = Router();

router.post(
  "/generate",
  async (req: Request<{}, {}, GenerateRequestParams>, res: Response) => {
    console.log(req.body);
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
      return res.status(201).json(payment);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        500,
        "Something went wrong with MercadoPago",
        error
      );
    }
  }
);

router.post(
  "/notification",
  async (req: Request<{}, NotificationRequestBody, {}>, res: Response) => {
    console.log(req.body);
    return res.status(200).send("All OK");
  }
);

export default router;
