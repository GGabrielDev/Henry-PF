import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
    DataTypes,
  } from "sequelize";
  import path from "path";
  
  interface Category_Seller_Model
    extends Model<
      InferAttributes<Category_Seller_Model>,
      InferCreationAttributes<Category_Seller_Model>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<number>;
    name_cate_prod: string;
    image: string;
  }
  
  // Exportamos una funcion que define el modelo
  // Luego le injectamos la conexion a sequelize.
  module.exports = (sequelize: Sequelize) => {
    // defino el modelo
    sequelize.define<Category_Seller_Model>(
      path.basename(__filename, path.extname(__filename)).toLowerCase(),
      {
        id: {
          type: DataTypes.INTEGER,
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