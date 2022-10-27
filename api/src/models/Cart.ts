import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
    DataTypes,
  } from "sequelize";
  import path from "path";
  
  interface Cart_Model
    extends Model<
      InferAttributes<Cart_Model>,
      InferCreationAttributes<Cart_Model>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<number>;
    amount: number;
  }
  
  // Exportamos una funcion que define el modelo
  // Luego le injectamos la conexion a sequelize.
  module.exports = (sequelize: Sequelize) => {
    // defino el modelo
    sequelize.define<Cart_Model>(
      path.basename(__filename, path.extname(__filename)).toLowerCase(),
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },

        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: false,
            }
        },
      }, 
      { timestamps: false,
        paranoid: true, 
    },
    );
  };