import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
    DataTypes,
  } from "sequelize";
  import path from "path";
  
  interface Customer_Orders_Model
    extends Model<
      InferAttributes<Customer_Orders_Model>,
      InferCreationAttributes<Customer_Orders_Model>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<string>;
    adress_dest: string;
    name_dest_person: string;
    sale_date: Date;
    total_price: number;
  }
  
  // Exportamos una funcion que define el modelo
  // Luego le injectamos la conexion a sequelize.
  module.exports = (sequelize: Sequelize) => {
    // defino el modelo
    sequelize.define<Customer_Orders_Model>(
      path.basename(__filename, path.extname(__filename)).toLowerCase(),
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },

        adress_dest:{
          type: DataTypes.STRING,
          allowNull:false,
        },

        name_dest_person: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        sale_date: {
          type: DataTypes.DATE,
        },

        total_price: {
          type: DataTypes.FLOAT(8,2),
          allowNull:false,
          validate: {
            isNumeric:true,
          }
        }
      }, 
      { timestamps: false,
        paranoid: true, 
    },
    );
  };
