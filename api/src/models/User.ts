import {
  Association,
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
  //  HasOneGetAssociationMixin,
  //  HasOneSetAssociationMixin,
  //  HasOneCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
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
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
} from "sequelize";
import path from "path";
import { Seller } from "./Seller";
//import { Countries } from "./Countries";
import { Review } from "./Review";
import { Product } from "./Product";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<string>;
  declare firstName: string | null;
  declare lastName: string;
  declare username: string;
  declare gender: string;
  declare email: string;
  declare phoneNumber: string;
  declare address: string;
  declare imagenDePerfil: string | null;
  declare suspended: boolean;
  declare isPremium: boolean;
  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
  // foreign keys are automatically added by associations methods (like Project.belongsTo)
  declare sellerId: ForeignKey<Seller["id"]>;
  //declare countryId: ForeignKey<Countries["id"]>;
  // `seller` is an eagerly-loaded association.
  // We tag it as `NonAttribute`
  declare seller?: NonAttribute<Seller>;
  //declare country?: NonAttribute<Countries>;
  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getSeller: BelongsToGetAssociationMixin<Seller>;
  declare setSeller: BelongsToSetAssociationMixin<Seller, Seller["id"]>;
  declare createSeller: BelongsToCreateAssociationMixin<Seller>;

  //  declare getCountry: HasOneGetAssociationMixin<Countries>;
  //  declare setCountry: HasOneSetAssociationMixin<Countries, Countries["id"]>;
  //  declare createCountry: HasOneCreateAssociationMixin<Countries>;

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

  // FAVORITE

  declare getFavoriteProduct: BelongsToManyGetAssociationsMixin<Product>;
  declare countFavoriteProducts: BelongsToManyCountAssociationsMixin;
  declare hasFavoriteProduct: BelongsToManyHasAssociationMixin<
    Product,
    Product["id"]
  >;
  declare hasFavoriteProducts: BelongsToManyHasAssociationsMixin<
    Product,
    Product["id"]
  >;
  declare setFavoriteProduct: BelongsToManySetAssociationsMixin<
    Product,
    Product["id"]
  >;
  declare addFavoriteProduct: BelongsToManyAddAssociationMixin<
    Product,
    Product["id"]
  >;
  declare addFavoriteProducts: BelongsToManyAddAssociationsMixin<
    Product,
    Product["id"]
  >;
  declare removeFavoriteProduct: BelongsToManyRemoveAssociationMixin<
    Product,
    Product["id"]
  >;
  declare removeFavoriteProducts: BelongsToManyRemoveAssociationsMixin<
    Product,
    Product["id"]
  >;
  declare createFavoriteProduct: BelongsToManyCreateAssociationMixin<Product>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare reviews?: NonAttribute<Review[]>; // Note this is optional since it's only populated when explicitly requested in code
  declare favorites?: NonAttribute<Product[]>; // Note this is optional since it's only populated when explicitly requested in code

  declare static associations: {
    reviews: Association<User, Review>;
    favorites: Association<User, Product>;
  };
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^[A-Za-z0-9\s]*$/,
        },
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^[A-Za-z0-9\s]*$/,
        },
      },

      username: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: true,
        validate: {
          isAlphanumeric: true,
        },
      },

      gender: {
        type: DataTypes.ENUM("M", "F", "No binario", "Prefiero no decirlo"),
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },

      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      imagenDePerfil: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },

      isPremium:{
        type:DataTypes.BOOLEAN,
        defaultValue: false,
      },

      suspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      name: {
        singular: "user",
        plural: "users",
      },
      tableName: path
        .basename(__filename, path.extname(__filename))
        .toLowerCase(),
      timestamps: true,
      paranoid: true,
    }
  );
};
