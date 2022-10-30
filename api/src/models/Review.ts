import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
  DataTypes,
} from "sequelize";
import path from "path";
import { Product } from "./Product";
import { User } from "./User";

export class Review extends Model<
  InferAttributes<Review>,
  InferCreationAttributes<Review>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<string>;
  declare body: string;
  declare score: string;
  // foreign keys are automatically added by associations methods (like Project.belongsTo)
  declare productId: ForeignKey<Product["id"]>;
  declare userId: ForeignKey<User["id"]>;
  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
  // `product` is an eagerly-loaded association.
  // We tag it as `NonAttribute`
  declare product?: NonAttribute<Product>;
  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getProduct: BelongsToGetAssociationMixin<Product>;
  declare setProduct: BelongsToSetAssociationMixin<Product, Product["id"]>;
  declare createProduct: BelongsToCreateAssociationMixin<Product>;

  declare getUser: BelongsToGetAssociationMixin<User>;
  declare setUser: BelongsToSetAssociationMixin<User, User["id"]>;
  declare createUser: BelongsToCreateAssociationMixin<User>;
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  Review.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: true,
        },
      },

      score: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNull: false,
        validate: {
          isNumeric: true,
        },
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
