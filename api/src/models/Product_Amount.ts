import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
    DataTypes,
  } from "sequelize";
  import path from "path";
  
  interface Product_Amount_Model
    extends Model<
      InferAttributes<Product_Amount_Model>,
      InferCreationAttributes<Product_Amount_Model>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<number>
    amount: CreationOptional<number>;

  }
  
  // Exportamos una funcion que define el modelo
  // Luego le injectamos la conexion a sequelize.
  module.exports = (sequelize: Sequelize) => {
    // defino el modelo
    sequelize.define<Product_Amount_Model>(
      path.basename(__filename, path.extname(__filename)).toLowerCase(),
      {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        timestamps: false,
        paranoid: false,
      },
    );
  };