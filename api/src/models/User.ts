import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  DataTypes,
  DATE,
} from "sequelize";
import path from "path";

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  UUID: CreationOptional<string>;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobile_zone: string;
  mobile: string;
  address: string;
  imagenDePerfil: CreationOptional<string>;
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  sequelize.define<UserModel>(
    path.basename(__filename, path.extname(__filename)).toLowerCase(),
    {
      UUID: {
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
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
        isEmail: true,
        }
      },

      mobile_zone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      imagenDePerfil: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false,
      paranoid: true,
    }
  );
};
