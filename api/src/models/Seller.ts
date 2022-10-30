import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
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
} from "sequelize";
import path from "path";
import { Category_Seller } from "./Category_Seller";
import { Product } from "./Product";
import { Review } from "./Review";
import { User } from "./User";

export class Seller extends Model<
  InferAttributes<Seller>,
  InferCreationAttributes<Seller>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<number>;
  declare nombreNegocio: string;
  declare pay_Money: string;
  declare imageLogo: string | null;
  declare template_page: string;
  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
  // foreign keys are automatically added by associations methods (like Project.belongsTo)
  declare userId: ForeignKey<User["id"]>;
  declare categoryId: ForeignKey<Category_Seller["id"]>;
  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare setUser: BelongsToSetAssociationMixin<User, User["id"]>;
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare createUser: BelongsToCreateAssociationMixin<User>;

  declare setCategory: BelongsToSetAssociationMixin<
    Category_Seller,
    Category_Seller["id"]
  >;
  declare getCategory: BelongsToGetAssociationMixin<Category_Seller>;
  declare createCategory: BelongsToCreateAssociationMixin<Category_Seller>;

  declare getProduct: HasManyGetAssociationsMixin<Product>;
  declare countProducts: HasManyCountAssociationsMixin;
  declare hasProduct: HasManyHasAssociationMixin<Product, Product["id"]>;
  declare hasProducts: HasManyHasAssociationsMixin<Product, Product["id"]>;
  declare setProduct: HasManySetAssociationsMixin<Product, Product["id"]>;
  declare addProduct: HasManyAddAssociationMixin<Product, Product["id"]>;
  declare addProducts: HasManyAddAssociationsMixin<Product, Product["id"]>;
  declare removeProduct: HasManyRemoveAssociationMixin<Product, Product["id"]>;
  declare removeProducts: HasManyRemoveAssociationsMixin<
    Product,
    Product["id"]
  >;
  declare createProduct: HasManyCreateAssociationMixin<Product>;

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
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      nombreNegocio: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },

      pay_Money: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      imageLogo: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        },
      },

      template_page: {
        type: DataTypes.ENUM("1", "2", "3"),
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },

    {
      sequelize,
      tableName: path
        .basename(__filename, path.extname(__filename))
        .toLowerCase(),
      timestamps: true,
      paranoid: true,
    }
  );
};
