import {
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
  DataTypes,
  UUIDV4,
} from "sequelize";
import path from "path";
import { Product } from "./Product";

export class Category_Product extends Model<
  InferAttributes<Category_Product>,
  InferCreationAttributes<Category_Product>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<number>;
  declare name: string;
  declare image: string | null;
  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare products?: NonAttribute<Product[]>; // Note this is optional since it's only populated when explicitly requested in code
  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getProduct: BelongsToManyGetAssociationsMixin<Product>;
  declare countProducts: BelongsToManyCountAssociationsMixin;
  declare hasProduct: BelongsToManyHasAssociationMixin<Product, Product["id"]>;
  declare hasProducts: BelongsToManyHasAssociationsMixin<
    Product,
    Product["id"]
  >;
  declare setProduct: BelongsToManySetAssociationsMixin<Product, Product["id"]>;
  declare addProduct: BelongsToManyAddAssociationMixin<Product, Product["id"]>;
  declare addProducts: BelongsToManyAddAssociationsMixin<
    Product,
    Product["id"]
  >;
  declare removeProduct: BelongsToManyRemoveAssociationMixin<
    Product,
    Product["id"]
  >;
  declare removeProducts: BelongsToManyRemoveAssociationsMixin<
    Product,
    Product["id"]
  >;
  declare createProduct: BelongsToManyCreateAssociationMixin<Product>;

  declare static associations: {
    products: Association<Category_Product, Product>;
  };
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  Category_Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: true,
        },
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      sequelize,
      name: {
        singular: "category",
        plural: "categories",
      },
      tableName: path
        .basename(__filename, path.extname(__filename))
        .toLowerCase(),
      timestamps: false,
      paranoid: true,
    }
  );
};
