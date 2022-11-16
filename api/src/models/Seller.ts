import {
  Association,
  //  BelongsToGetAssociationMixin,
  //  BelongsToSetAssociationMixin,
  //  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  ForeignKey,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
  HasOneSetAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneCreateAssociationMixin,
} from "sequelize";
import path from "path";
import { Product } from "./Product";
import { User } from "./User";
import { Cart } from "./Cart";

export class Seller extends Model<
  InferAttributes<Seller>,
  InferCreationAttributes<Seller>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<string>;
  declare nombreNegocio: string;
  declare imageLogo: string | null;
  declare categorias: string;
  declare template_page: string;
  declare suspended: boolean;
  declare paymentId: string;
  declare description: string;
  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare setUser: HasOneSetAssociationMixin<User, User["id"]>;
  declare getUser: HasOneGetAssociationMixin<User>;
  declare createUser: HasOneCreateAssociationMixin<User>;

  declare getProduct: HasManyGetAssociationsMixin<Product>;
  declare countProducts: HasManyCountAssociationsMixin;
  declare hasProduct: HasManyHasAssociationMixin<Product, Product["id"]>;
  declare hasProducts: HasManyHasAssociationsMixin<Product, Product["id"]>;
  declare setProduct: HasManySetAssociationsMixin<Product, Product["id"]>;
  declare addProduct: HasManyAddAssociationMixin<Product, Product["id"]>;
  declare addProducts: HasManyAddAssociationsMixin<Product, Product["id"]>;
  declare removeProduct: HasManyRemoveAssociationMixin<Product, Product["id"]>;
  declare removeProducts: HasManyRemoveAssociationsMixin<Product, Product["id"]>;
  declare createProduct: HasManyCreateAssociationMixin<Product>;

  declare hasCart: HasManyHasAssociationMixin<Cart, Cart["id"]>;           //-
  declare hasCarts: HasManyHasAssociationsMixin<Cart, Cart["id"]>;           //-
  declare setCart: HasManySetAssociationsMixin<Cart, Cart["id"]>;           //-
  declare addCart: HasManyAddAssociationMixin<Cart, Cart["id"]>;           //-
  declare addCarts: HasManyAddAssociationsMixin<Cart, Cart["id"]>;           //-
  declare removeCart: HasManyRemoveAssociationMixin<Cart, Cart["id"]>;           //-
  declare removeCarts: HasManyRemoveAssociationsMixin<Cart, Cart["id"]>;           //-
  declare createCart: HasManyCreateAssociationMixin<Cart>;              //-

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare products?: NonAttribute<Product[]>; // Note this is optional since it's only populated when explicitly requested in code

  declare static associations: {
    products: Association<Seller, Product>;
  };
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  Seller.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      nombreNegocio: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isAlpha: true,
        },
      },

      imageLogo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },

      categorias: {
        type: DataTypes.ENUM(
          "Gastronomia",
          "Entretenimiento",
          "Servicios",
          "Tecnologia",
          "Vestimenta",
          "Educacion",
          "No esta especificado"
        ),
        defaultValue: "No esta especificado",
      },

      template_page: {
        type: DataTypes.ENUM("1", "2", "3"),
        defaultValue: "1",
      },

      suspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      paymentId: {
        type: DataTypes.STRING,
        defaultValue: null,
      },

      description: {
        type: DataTypes.STRING,
        defaultValue: null,
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },

    {
      sequelize,
      name: {
        singular: "seller",
        plural: "sellers",
      },
      tableName: path
        .basename(__filename, path.extname(__filename))
        .toLowerCase(),
      timestamps: true,
      paranoid: true,
    }
  );
};
