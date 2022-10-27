import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
    DataTypes,
  } from "sequelize";
  import path from "path";
  
  interface Category_Producto_Model
    extends Model<
      InferAttributes<Category_Producto_Model>,
      InferCreationAttributes<Category_Producto_Model>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    cate_prod_id: CreationOptional<string>;
    name_cate_prod: string;
    image: string;
  }
  
  // Exportamos una funcion que define el modelo
  // Luego le injectamos la conexion a sequelize.
  module.exports = (sequelize: Sequelize) => {
    // defino el modelo
    sequelize.define<Category_Producto_Model>(
      path.basename(__filename, path.extname(__filename)).toLowerCase(),
      {
        cate_prod_id: {
          type: DataTypes.NUMBER,
          autoIncrement: true,
          unique: true,
          primaryKey:true,
        },
  
        name_cate_prod: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isAlphanumeric: true,
          }
        },

        image: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
            isUrl: true,
          }
        }

      },
      {
        timestamps: false,
        paranoid: true,
      },
    );
  };