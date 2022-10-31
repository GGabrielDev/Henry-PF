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
import { Category_Product } from "./Category_product";
import { Review } from "./Review";
import { Seller } from "./Seller";

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string;
  declare price_dollar: number | null;
  declare price_local: number;
  declare stock: string | null;
  declare image: CreationOptional<string> | null;
  declare suspended: boolean;
  declare size: string | null;
  // foreign keys are automatically added by associations methods (like Project.belongsTo)
  declare sellerId: ForeignKey<Seller["id"]>;
  // `seller` is an eagerly-loaded association.
  // We tag it as `NonAttribute`
  declare seller?: NonAttribute<Seller>;
  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getCategory: BelongsToManyGetAssociationsMixin<Category_Product>;
  declare countCategories: BelongsToManyCountAssociationsMixin;
  declare hasCategory: BelongsToManyHasAssociationMixin<
    Category_Product,
    Category_Product["id"]
  >;
  declare hasCategories: BelongsToManyHasAssociationsMixin<
    Category_Product,
    Category_Product["id"]
  >;
  declare setCategory: BelongsToManySetAssociationsMixin<
    Category_Product,
    Category_Product["id"]
  >;
  declare addCategory: BelongsToManyAddAssociationMixin<
    Category_Product,
    Category_Product["id"]
  >;
  declare addCategories: BelongsToManyAddAssociationsMixin<
    Category_Product,
    Category_Product["id"]
  >;
  declare removeCategory: BelongsToManyRemoveAssociationMixin<
    Category_Product,
    Category_Product["id"]
  >;
  declare removeCategories: BelongsToManyRemoveAssociationsMixin<
    Category_Product,
    Category_Product["id"]
  >;
  declare createCategory: BelongsToManyCreateAssociationMixin<Category_Product>;

  declare getReview: HasManyGetAssociationsMixin<Review>;
  declare countReviews: HasManyCountAssociationsMixin;
  declare hasReview: HasManyHasAssociationMixin<Review, Review["id"]>;
  declare hasReviews: HasManyHasAssociationsMixin<Review, Review["id"]>;
  declare setReview: HasManySetAssociationsMixin<Review, Review["id"]>;
  declare addReview: HasManyAddAssociationMixin<Review, Review["id"]>;
  declare addReviews: HasManyAddAssociationsMixin<Review, Review["id"]>;
  declare removeReview: HasManyRemoveAssociationMixin<Review, Review["id"]>;
  declare removeReviews: HasManyRemoveAssociationsMixin<Review, Review["id"]>;
  declare createReview: HasManyCreateAssociationMixin<Review>;

  declare getSeller: HasOneGetAssociationMixin<Seller>;
  declare setSeller: HasOneSetAssociationMixin<Seller, Seller["id"]>;
  declare createSeller: HasOneCreateAssociationMixin<Seller>;
  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare categories?: NonAttribute<Category_Product[]>; // Note this is optional since it's only populated when explicitly requested in code
  declare reviews?: NonAttribute<Review[]>;

  declare static associations: {
    categories: Association<Product, Category_Product>;
    reviews: Association<Product, Review>;
  };
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[A-Za-z0-9\s]*$/,
        },
      },

      price_dollar: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
        validate: {
          isNumeric: true,
        },
      },

      price_local: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          is: /^[A-Za-z0-9\s]*$/,
        },
      },

      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
        },
      },

      image: {
        type: DataTypes.STRING,
        allowNull:true,
        // validate: {
        //   isUrl: true,
        // },
      },

      suspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      size: {
        type: DataTypes.ENUM("XS", "S", "M", "L", "XL", "Null"),
        allowNull: true,
        defaultValue: null,
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
