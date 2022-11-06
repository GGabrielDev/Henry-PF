import { Request, Response, Router, NextFunction } from "express";
import { appendFile } from "fs";
import { Models } from "../db";
const { MercadoPago } = Models;

const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token:
    "TEST-6021195329730298-110520-c1b02f22c0cbfcbc82ce10a408365b0e-388312893",
});

// EL ACCESS TOKEN VA EN .ENV PERO SE HARDCODEA POR EL MOMENTO

const router = Router();

router.post("/", (req, res) => {
  let preference = {
    back_urls: {
      success: "https://localhost:3000/tugamer",
    },
    items: [
      {
        title: "Placa Madre",
        unit_price: 100,
        quantity: 1,
        id: "1",
      },
    ],
    notification_url: "https://localhost:3000/tugamer",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response: any) {
      console.log(response.body.init_point);
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
      res.send(response.body.init_point);
    })
    .catch(function (error: string) {
      console.log(error);
    });
});

export default router;
