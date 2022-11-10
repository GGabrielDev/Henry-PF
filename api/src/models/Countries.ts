import {
  Association,
  CreationOptional,
  DataTypes,
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
import { User } from "./User";

// Usar la API del PI, https://restcountries.com/#api-endpoints-v3-code

export class Countries extends Model<
  InferAttributes<Countries>,
  InferCreationAttributes<Countries>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<number>;
  declare name_spanish: string;
  declare name: string;
  declare code_cca3: string;
  declare mobile_zone: number;
  declare flag: string;
  declare code_currencies: string;
  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getUser: HasManyGetAssociationsMixin<User>;
  declare countUsers: HasManyCountAssociationsMixin;
  declare hasUser: HasManyHasAssociationMixin<User, User["id"]>;
  declare hasUsers: HasManyHasAssociationsMixin<User, User["id"]>;
  declare setUser: HasManySetAssociationsMixin<User, User["id"]>;
  declare addUser: HasManyAddAssociationMixin<User, User["id"]>;
  declare addUsers: HasManyAddAssociationsMixin<User, User["id"]>;
  declare removeUser: HasManyRemoveAssociationMixin<User, User["id"]>;
  declare removeUsers: HasManyRemoveAssociationsMixin<User, User["id"]>;
  declare createUser: HasManyCreateAssociationMixin<User>;
  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare users?: NonAttribute<User[]>;

  declare static associations: {
    users: Association<Countries, User>;
  };
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  Countries.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },

      name_spanish: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },

      code_cca3: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },

      mobile_zone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },

      flag: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },

      code_currencies: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      name: {
        singular: "country",
        plural: "countries",
      },
      tableName: path
        .basename(__filename, path.extname(__filename))
        .toLowerCase(),
      timestamps: false,
      paranoid: true,
    }
  );
};
