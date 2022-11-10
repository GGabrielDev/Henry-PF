import {
  Association,
  CreationOptional,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
  DataTypes,
} from "sequelize";
import path from "path";
import { Seller } from "./Seller";

export class Category_Seller extends Model<
  InferAttributes<Category_Seller>,
  InferCreationAttributes<Category_Seller>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<number>;
  declare name: string;
  declare image: string;
  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare sellers?: NonAttribute<Seller[]>; // Note this is optional since it's only populated when explicitly requested in code
  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getSeller: HasManyGetAssociationsMixin<Seller>;
  declare countSellers: HasManyCountAssociationsMixin;
  declare hasSeller: HasManyHasAssociationMixin<Seller, Seller["id"]>;
  declare hasSellers: HasManyHasAssociationsMixin<Seller, Seller["id"]>;
  declare setSeller: HasManySetAssociationsMixin<Seller, Seller["id"]>;
  declare addSeller: HasManyAddAssociationMixin<Seller, Seller["id"]>;
  declare addSellers: HasManyAddAssociationsMixin<Seller, Seller["id"]>;
  declare removeSeller: HasManyRemoveAssociationMixin<Seller, Seller["id"]>;
  declare removeSellers: HasManyRemoveAssociationsMixin<Seller, Seller["id"]>;
  declare createSeller: HasManyCreateAssociationMixin<Seller>;

  declare static associations: {
    sellers: Association<Category_Seller, Seller>;
  };
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  Category_Seller.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
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
