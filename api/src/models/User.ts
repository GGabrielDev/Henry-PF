import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  DataTypes,
} from "sequelize";
import path from "path";

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<string>;
  firstName: string;
  lastName: string;
  username: string;
  genero: string;
  email: string;
  mobile: string;
  address: string;
  imagenDePerfil: CreationOptional<string>;
  userType: string;
  suspended: boolean;
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  sequelize.define<UserModel>(
    path.basename(__filename, path.extname(__filename)).toLowerCase(),
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
        }
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        }
      },

      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: true,
      },
    },

    genero:{
      type: DataTypes.ENUM("M","F","No binario", "No quiero decir"),
      defaultValue:"No quiero decir",
    },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          isEmail: true,
        }
      },

      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          is: /^[0-9]+(-[0-9]+)+$/i,
        }
      },

      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      imagenDePerfil: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        }
      },

      userType:{
        type: DataTypes.ENUM("Administrador General", "Administrador", "Usuario"),
        allowNull: false,
      },

      suspended: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
      paranoid: true,
    },
  );
};