import { Request, Response, Router, NextFunction } from "express";
import { Models } from "../db";
import HttpException from "../exceptions/HttpException";
import { Product_Amount as ProductAmount_Type } from "../models/Product_Amount";
import { Seller as Seller_Type } from "../models/Seller";
import { Customer_Orders as CustomerOrders_Type } from "../models/Customer_Orders";
import { Cart as Cart_Type } from "../models/Cart";

const router = Router();
const { Cart, Seller, Product_Amount, Customer_Orders } = Models;

type CartParams = {
  cartId: string;
};

type CartQuery = {};

type CartBody = {};

type RouteRequest = Request<CartParams, CartQuery, CartBody>;

router.get(
  "/:cartId",
  async (req: RouteRequest, res: Response, next: NextFunction) => {
    try {
      const { cartId } = req.params;

      const result = await Cart.findByPk(cartId)
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
        throw new HttpException(404, "No cart is associated for this id");
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
      const { sellerId, product_amountId, customer_orderId, } = req.query;

      if (sellerId === undefined) {
        throw new HttpException(400, "sellerId is missing in the query");
      }

      if (product_amountId === undefined) {
        throw new HttpException(400, "product_amountId is missing in the query");
      }

      if (customer_orderId === undefined) {
        throw new HttpException(400, "customer_orderId is missing in the query");
      }

      const seller = await Seller.findByPk(sellerId.toString())
        .then((value) => value as Seller_Type)
        .catch((error) => {
          if (error.parent.code === "22P02") {
            throw new HttpException(
              400,
              "The format of the request is not UUID"
            );
          }
        });

      if (!seller) {
        throw new HttpException(404, "No User belongs to this ID");
      }

      const productAmount = await Product_Amount.findByPk(product_amountId.toString())
        .then((value) => value as ProductAmount_Type)
        .catch((error) => {
          if (error.parent.code === "22P02") {
            throw new HttpException(
              400,
              "The format of the request is not UUID"
            );
          }
        });

      if (!productAmount) {
        throw new HttpException(404, "No Product belongs to this ID");
      }

      const customerOrders = await Customer_Orders.findByPk(customer_orderId.toString())
        .then((value) => value as CustomerOrders_Type)
        .catch((error) => {
          if (error.parent.code === "22P02") {
            throw new HttpException(
              400,
              "The format of the request is not UUID"
            );
          }
        });

      if (!customerOrders) {
        throw new HttpException(404, "No Product belongs to this ID");
      }

      const cart = (await Cart.create({ })) as Cart_Type;
      console.log(cart.toJSON());

      await seller.addCart(cart.id);
      await productAmount.addCart(cart.id);
      await customerOrders.addCart(cart.id);
//  <<<<<<<<<<<<<<< Aqui preguntar cómo funciona lo que sigue >>>>>>>>>>>>>
      return res.status(201).send(
        await Cart.findOne({
          attributes: {
            exclude: ["sellerId"],
          },
          where: {
            id: cart.id,
          },
          include: Seller,
        })
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

);

// router.put(
//   "/:sellerId",
//   async (req: RouteRequest, res: Response, next: NextFunction) => {
//     try {
//       const { sellerId } = req.params;
//       const possibleValues = [
//         "nombreNegocio",
//         "pay_Money",
//         "imageLogo",
//         "template_page",
//         "suspended",
//       ];
//       const arrayBody = Object.entries(req.body).filter((value) =>
//         possibleValues.find((possibleValue) => possibleValue === value[0])
//       );

//       if (arrayBody.length === 0) {
//         throw new HttpException(
//           400,
//           "The request has no valid body parameters"
//         );
//       }

//       const body = Object.fromEntries(arrayBody);

//       if (!sellerId) {
//         throw new HttpException(400, "The Seller ID is missing in the request");
//       }

//       const result = await Seller.findByPk(sellerId)
//         .then((value) => value)
//         .catch((error) => {
//           if (error.parent.code === "22P02") {
//             throw new HttpException(
//               400,
//               "The format of the request is not UUID"
//             );
//           }
//         });

//       if (!result) {
//         throw new HttpException(404, "The requested Seller doesn't exist");
//       } else {
//         result.set(body);
//         await result.save();

//         res.status(200).send(result);
//       }
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   }
// );

// router.delete(
//   "/:sellerId",
//   async (req: RouteRequest, res: Response, next: NextFunction) => {
//     try {
//       const { sellerId } = req.params;

//       if (!sellerId) {
//         throw new HttpException(400, "The Seller ID is missing in the request");
//       }
//       const result = await Seller.findByPk(sellerId)
//         .then((value) => value)
//         .catch((error) => {
//           if (error.parent.code === "22P02") {
//             throw new HttpException(
//               400,
//               "The format of the request is not UUID"
//             );
//           }
//         });

//       if (!result) {
//         throw new HttpException(404, "The requested Seller doesn't exist");
//       }

//       await result.destroy();

//       res.status(200).send("The chosen Seller was deleted successfully");
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export default router;
