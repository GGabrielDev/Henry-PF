import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  DataTypes,
} from "sequelize";
import path from "path";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
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
          "Administrador",
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

