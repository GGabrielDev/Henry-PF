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
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import path from "path";
import { Seller } from "./Seller";
import { Countries } from "./Countries";
import { Review } from "./Review";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<string>;
  declare firstName: string;
  declare lastName: string;
  declare username: string;
  declare gender: string;
  declare email: string;
  declare mobile: string;
  declare address: string;
  declare imagenDePerfil: string | null;
  declare userType: string;
  declare suspended: boolean;
  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
  // foreign keys are automatically added by associations methods (like Project.belongsTo)
  declare sellerId: ForeignKey<Seller["id"]>;
  declare countryId: ForeignKey<Countries["id"]>;
  // `seller` is an eagerly-loaded association.
  // We tag it as `NonAttribute`
  declare seller?: NonAttribute<Seller>;
  declare country?: NonAttribute<Countries>;
  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getSeller: HasOneGetAssociationMixin<Seller>;
  declare setSeller: HasOneSetAssociationMixin<Seller, Seller["id"]>;
  declare createSeller: HasOneCreateAssociationMixin<Seller>;

  declare getCountry: HasOneGetAssociationMixin<Countries>;
  declare setCountry: HasOneSetAssociationMixin<Countries, Countries["id"]>;
  declare createCountry: HasOneCreateAssociationMixin<Countries>;

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
  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare reviews?: NonAttribute<Review[]>; // Note this is optional since it's only populated when explicitly requested in code

  declare static associations: {
    reviews: Association<User, Review>;
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
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },

      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: true,
        },
      },

      gender: {
        type: DataTypes.ENUM("M", "F", "No binario", "No quiero decir"),
        defaultValue: "No quiero decir",
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          isEmail: true,
        },
      },

      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          is: /^[0-9]+(-[0-9]+)+$/i,
        },
      },

      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      imagenDePerfil: {
        type: DataTypes.STRING,
        allowNull:true,
        validate: {
          isUrl: true,
        },
      },

      userType: {
        type: DataTypes.ENUM(
          "Administrador General",
          "Vendedor",
          "Usuario"
        ),
        defaultValue: "Usuario",
        allowNull: false,
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
      tableName: path
        .basename(__filename, path.extname(__filename))
        .toLowerCase(),
      timestamps: true,
      paranoid: true,
    }
  );
};
