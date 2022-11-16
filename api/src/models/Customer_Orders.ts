import {
  Association,                           //-
  CreationOptional,
  DataTypes,
  ForeignKey,                             //-
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
  InferAttributes,
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
import { User } from "./User";      //-
//import {Cart} from "./Cart";      //-

export class Customer_Orders extends Model<
    InferAttributes<Customer_Orders>,
    InferCreationAttributes<Customer_Orders>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<string>;
  declare destination: string;
  declare destination_person: string;
  declare sale_date: Date;
  declare total_price: number;

 //-------------Leonardo-------------------
 // timestamps!
  // foreign keys are automatically added by associations methods (like Project.belongsTo)
  declare UserId: ForeignKey<User["id"]>;
  //declare countryId: ForeignKey<Countries["id"]>;
  // `seller` is an eagerly-loaded association.
  // We tag it as `NonAttribute`
  declare user?: NonAttribute<User>;
  //declare country?: NonAttribute<Countries>;
  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare setUser: BelongsToSetAssociationMixin<User, User["id"]>;
  declare createUser: BelongsToCreateAssociationMixin<User>;

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
  declare users?: NonAttribute<User[]>; // Note this is optional since it's only populated when explicitly requested in code

  declare static associations: {
    //carts: Association<Customer_Orders, Cart>;           //-
    //favorites: Association<Customer_Orders, Product>;
  };
}
//----------------------------------------

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  Customer_Orders.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      destination_person: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      sale_date: {
        type: DataTypes.DATE,
      },

      total_price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
    },
    {
      sequelize,
      name: {
        singular: "customer_Order",
        plural: "customer_Orders",
      },
      tableName: path
        .basename(__filename, path.extname(__filename))
        .toLowerCase(),
      timestamps: false,
      paranoid: true,
    }
  );
};
