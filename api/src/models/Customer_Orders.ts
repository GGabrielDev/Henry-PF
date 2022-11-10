import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  DataTypes,
} from "sequelize";
import path from "path";

export class Customer_Orders extends Model<
    InferAttributes<Customer_Orders>,
    InferCreationAttributes<Customer_Orders>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<string>;
  declare destination: string;
  declare destination_person: string;
  declare sale_date: Date;
  declare total_price: number;
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  Customer_Orders.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      destination_person: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      sale_date: {
        type: DataTypes.DATE,
      },

      total_price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
    },
    {
      sequelize,
      name: {
        singular: "customer_Order",
        plural: "customer_Orders",
      },
      tableName: path
        .basename(__filename, path.extname(__filename))
        .toLowerCase(),
      timestamps: false,
      paranoid: true,
    }
  );
};
