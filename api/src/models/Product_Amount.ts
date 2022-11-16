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
  NonAttribute,                   //-
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
  BelongsToCreateAssociationMixin,     //-
} from "sequelize";
import path from "path";
import { Product } from "./Product";      //-
//import {Cart} from "./Cart";      //-

export class Product_Amount extends Model<
  InferAttributes<Product_Amount>,
  InferCreationAttributes<Product_Amount>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<number>;
  declare amount: number | null;

//-------------Leonardo-------------------
 // timestamps!
  // foreign keys are automatically added by associations methods (like Project.belongsTo)
  declare productId: ForeignKey<Product["id"]>;
  // We tag it as `NonAttribute`
  declare product?: NonAttribute<Product>;
  //declare country?: NonAttribute<Countries>;
  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  
  declare getProduct: BelongsToGetAssociationMixin<Product>;
  declare setProduct: BelongsToSetAssociationMixin<Product, Product["id"]>;
  declare createProduct: BelongsToCreateAssociationMixin<Product>;

  // declare getReview: HasManyGetAssociationsMixin<Cart>;           //-
  // declare countReviews: HasManyCountAssociationsMixin;           //-
  // declare hasCart: HasManyHasAssociationMixin<Cart, Cart["id"]>;           //-
  // declare hasCarts: HasManyHasAssociationsMixin<Cart, Cart["id"]>;           //-
  // declare setCart: HasManySetAssociationsMixin<Cart, Cart["id"]>;           //-
  // declare addCart: HasManyAddAssociationMixin<Cart, Cart["id"]>;           //-
  // declare addCarts: HasManyAddAssociationsMixin<Cart, Cart["id"]>;           //-
  // declare removeCart: HasManyRemoveAssociationMixin<Cart, Cart["id"]>;           //-
  // declare removeCarts: HasManyRemoveAssociationsMixin<Cart, Cart["id"]>;           //-
  // declare createCart: HasManyCreateAssociationMixin<Cart>;              //-

  // FAVORITE

 // . . .
 // . . .

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  // declare carts?: NonAttribute<Cart[]>; // Note this is optional since it's only populated when explicitly requested in code    //-
  declare products?: NonAttribute<Product[]>; // Note this is optional since it's only populated when explicitly requested in code

  declare static associations: {
    //carts: Association<Customer_Orders, Cart>;           //-
    products: Association<Product_Amount, Product>;
  };
}
//----------------------------------------
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  Product_Amount.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        // type: DataTypes.UUID,
        // defaultValue: DataTypes.UUIDV4,
        // primaryKey: true,
      },

      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: path.basename(__filename, path.extname(__filename)).toLowerCase(),
      timestamps: false,
      paranoid: true,
    },
  );
};