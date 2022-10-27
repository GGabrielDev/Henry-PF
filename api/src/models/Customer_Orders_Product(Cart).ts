import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
    DataTypes,
  } from "sequelize";
  import path from "path";
  
  interface Customer_Orders_Product_Model
    extends Model<
      InferAttributes<Customer_Orders_Product_Model>,
      InferCreationAttributes<Customer_Orders_Product_Model>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    cart_id: CreationOptional<string>;
    name_prod: string;
    price_prod: number;
    amount: number;
  }
  
  // Exportamos una funcion que define el modelo
  // Luego le injectamos la conexion a sequelize.
  module.exports = (sequelize: Sequelize) => {
    // defino el modelo
    sequelize.define<Customer_Orders_Product_Model>(
      path.basename(__filename, path.extname(__filename)).toLowerCase(),
      {
        cart_id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },

        name_prod:{
            type: DataTypes.STRING(120),
            allowNull: false,
        },

        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: false,
            }
        },

        price_prod: {
          type: DataTypes.FLOAT(8,2),
          allowNull:false,
          validate: {
            isNumeric:true,
          }
        },
      }, 
      { timestamps: false,
        paranoid: true, 
    },
    );
  };