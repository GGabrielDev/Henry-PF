import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  HasManyAddAssociationMixin,         //-
  HasManyAddAssociationsMixin,         //-
  HasManyHasAssociationsMixin,         //-
  HasManyCountAssociationsMixin,         //-
  HasManyCreateAssociationMixin,         //-
  HasManyHasAssociationMixin,         //-
  HasManyGetAssociationsMixin,         //-
  HasManySetAssociationsMixin,         //-
  HasManyRemoveAssociationMixin,         //-
  HasManyRemoveAssociationsMixin,         //-
  InferCreationAttributes,
  Model,
  Sequelize,
  
  BelongsToManyAddAssociationMixin,     //-
  BelongsToManyAddAssociationsMixin,     //-
  BelongsToManyCountAssociationsMixin,     //-
  BelongsToManyCreateAssociationMixin,     //-
  BelongsToManyGetAssociationsMixin,     //-
  BelongsToManyHasAssociationMixin,     //-
  BelongsToManyHasAssociationsMixin,     //-
  BelongsToManySetAssociationsMixin,     //-
  BelongsToManyRemoveAssociationMixin,     //-
  BelongsToManyRemoveAssociationsMixin,     //-
  BelongsToGetAssociationMixin,     //-
  BelongsToSetAssociationMixin,     //-
  BelongsToCreateAssociationMixin, 
} from "sequelize";
import path from "path";
import {Customer_Orders} from "./Customer_Orders";
import { Product_Amount } from "./Product_Amount";
import { Seller } from "./Seller";
import {Recipt}from "./Recipt";
//import {Seller_Prod_Sold} from "./Seller_Prod_Sold";

export class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<number>;
  //declare amount: number;  // <------------¿ Va o no va ? -----------------
  declare productId: ForeignKey<Product_Amount["id"]>;
  declare sellerId: ForeignKey<Seller["id"]>;
  declare CustomerOrdersId: ForeignKey<Customer_Orders["id"]>;
  
  declare getProductAmount: BelongsToGetAssociationMixin<Product_Amount>;
  declare setProductAmount: BelongsToSetAssociationMixin<Product_Amount, Product_Amount["id"]>;
  declare createProductAmount: BelongsToCreateAssociationMixin<Product_Amount>;

  declare getCustomerOrders: BelongsToGetAssociationMixin<Customer_Orders>;
  declare setCustomerOrders: BelongsToSetAssociationMixin<Customer_Orders, Customer_Orders["id"]>;
  declare createCustomerOrders: BelongsToCreateAssociationMixin<Customer_Orders>;

  declare getSeller: BelongsToGetAssociationMixin<Seller>;
  declare setSeller: BelongsToSetAssociationMixin<Seller, Seller["id"]>;
  declare createSeller: BelongsToCreateAssociationMixin<Seller>;

  declare getRecipt: HasManyGetAssociationsMixin<Recipt>;
  declare countRecipts: HasManyCountAssociationsMixin;
  declare hasRecipt: HasManyHasAssociationMixin<Recipt, Recipt["id"]>;
  declare hasRecipts: HasManyHasAssociationsMixin<Recipt, Recipt["id"]>;
  declare setRecipt: HasManySetAssociationsMixin<Recipt, Recipt["id"]>;
  declare addRecipt: HasManyAddAssociationMixin<Recipt, Recipt["id"]>;
  declare addRecipts: HasManyAddAssociationsMixin<Recipt, Recipt["id"]>;
  declare removeRecipt: HasManyRemoveAssociationMixin<Recipt, Recipt["id"]>;
  declare removeRecipts: HasManyRemoveAssociationsMixin<Recipt, Recipt["id"]>;
  declare createRecipt: HasManyCreateAssociationMixin<Recipt>;

  // declare getSellerProdSold: HasManyGetAssociationsMixin<Seller_Prod_Sold>;
  // declare countSellerProdSolds: HasManyCountAssociationsMixin;
  // declare hasSellerProdSold: HasManyHasAssociationMixin<Seller_Prod_Sold, Seller_Prod_Sold["id"]>;
  // declare hasSellerProdSolds: HasManyHasAssociationsMixin<Seller_Prod_Sold, Seller_Prod_Sold["id"]>;
  // declare setSellerProdSold: HasManySetAssociationsMixin<Seller_Prod_Sold, Seller_Prod_Sold["id"]>;
  // declare addSellerProdSold: HasManyAddAssociationMixin<Seller_Prod_Sold, Seller_Prod_Sold["id"]>;
  // declare addSellerProdSolds: HasManyAddAssociationsMixin<Seller_Prod_Sold, Seller_Prod_Sold["id"]>;
  // declare removeSellerProdSold: HasManyRemoveAssociationMixin<Seller_Prod_Sold, Seller_Prod_Sold["id"]>;
  // declare removeSellerProdSolds: HasManyRemoveAssociationsMixin<Seller_Prod_Sold, Seller_Prod_Sold["id"]>;
  // declare createSellerProdSold: HasManyCreateAssociationMixin<Seller_Prod_Sold>;
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  Cart.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      // amount: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   validate: {
      //     isNumeric: false,
      //   },
      // },
    },
    {
      sequelize,
      name: {
        singular: "Cart",
        plural: "Carts",
      },
      tableName: path
        .basename(__filename, path.extname(__filename))
        .toLowerCase(),
      timestamps: false,
      paranoid: true,
    }
  );
};
