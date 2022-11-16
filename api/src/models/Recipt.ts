import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
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
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
  DataTypes,
} from "sequelize";
import path from "path";
import { User } from "./User";
import { Product } from "./Product";
import {Cart} from "./Cart";      //-
import {Seller} from "./Seller";      //-

export class Recipt extends Model<
  InferAttributes<Recipt>,
  InferCreationAttributes<Recipt>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<number>;
  declare mpOrderId: string;
  declare name_prod: string;
  declare sale_date: Date;
  declare amount: number | null;
  declare price: number;
  declare total_price: number;
// foreign keys are automatically added by associations methods (like Project.belongsTo)
  declare sellerId: ForeignKey<Seller["id"]>;
  declare ProductId: ForeignKey<Product["id"]>;
  declare UserId: ForeignKey<User["id"]>;
  declare CartId: ForeignKey<Cart["id"]>;
// `product` is an eagerly-loaded association.
  // We tag it as `NonAttribute`
  declare product?: NonAttribute<Product>;
  declare user?: NonAttribute<User>;
  declare seller?: NonAttribute<Seller>;  
  declare cart?: NonAttribute<Cart>;  
 // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.

  declare getProduct: BelongsToGetAssociationMixin<Product>;
  declare setProduct: BelongsToSetAssociationMixin<Product, Product["id"]>;
  declare createProduct: BelongsToCreateAssociationMixin<Product>;

  declare getUser: BelongsToGetAssociationMixin<User>;
  declare setUser: BelongsToSetAssociationMixin<User, User["id"]>;
  declare createUser: BelongsToCreateAssociationMixin<User>; 

  declare getSeller: BelongsToGetAssociationMixin<Seller>;
  declare setSeller: BelongsToSetAssociationMixin<Seller, Seller["id"]>;
  declare createSeller: BelongsToCreateAssociationMixin<Seller>; 

  declare getCart: BelongsToGetAssociationMixin<Cart>;
  declare setCart: BelongsToSetAssociationMixin<Cart, Cart["id"]>;
  declare createCart: BelongsToCreateAssociationMixin<Cart>; 
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  Recipt.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      mpOrderId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      name_prod: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[A-Za-z0-9\s]*$/,
        },
      },
      sale_date: {
        type: DataTypes.DATE,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
        validate: {
          isNumeric: true,
        },
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
        singular: "recipt",
        plural: "recipts",
      },
      tableName: path
        .basename(__filename, path.extname(__filename))
        .toLowerCase(),
      timestamps: false,
      paranoid: true,
    }
  );
};
