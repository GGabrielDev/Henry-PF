import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  DataTypes,
} from "sequelize";
import path from "path";

class Seller extends Model<
  InferAttributes<Seller>,
  InferCreationAttributes<Seller>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<number>;
  declare nombreNegocio: string;
  declare pay_Money: string;
  declare imageLogo: string | null;
  declare template_page: string;
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
  Seller.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
      },

      nombreNegocio: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        }
      },

      pay_Money: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      imageLogo: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        }
      },

      template_page: {
        type: DataTypes.ENUM("1", "2", "3")
      },

      createdAt:DataTypes.DATE,
      updatedAt:DataTypes.DATE,
    },

    {
      sequelize,
      tableName: path.basename(__filename, path.extname(__filename)).toLowerCase(),
      timestamps: true,
      paranoid: true,
    },
  );
};