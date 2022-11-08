import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  DataTypes,
} from "sequelize";
import path from "path";
import {Seller} from "./Seller";
import {Product} from "./Product";
import {Customer_Orders} from "./Customer_Orders";

export class Seller_Prod_Sold extends Model<
    InferAttributes<Seller_Prod_Sold>,
    InferCreationAttributes<Seller_Prod_Sold>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<string>;
  declare name_prod: string;
  declare amount: number;
  declare total_price: number;
  declare sale_date: Date;
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  Seller_Prod_Sold.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name_prod: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      amount: {
        type: DataTypes.DECIMAL(8,2),
        allowNull: false,
      },

      total_price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
        validate: {
          isNumeric: true,
        }
      },

      sale_date: {
        type: DataTypes.DATE,
      }
    },
    {
      sequelize,
      tableName: path.basename(__filename, path.extname(__filename)).toLowerCase(),
      timestamps: false,
      paranoid: true,
    },
  );
};
