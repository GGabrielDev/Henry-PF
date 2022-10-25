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
  id: CreationOptional<string>;
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
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      
      UUID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      }, 

      firstName: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.STRING,
      },

      lastName: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.STRING,
      },
      
      username: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.STRING,
      },

      email: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.STRING,
      },

      mobile_zone: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.STRING,
      },
      mobile: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.STRING,
      },

      address: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.STRING,
      },

      imagenDePerfil: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
