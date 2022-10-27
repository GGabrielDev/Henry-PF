import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
    DataTypes,
  } from "sequelize";
  import path from "path";
  
  class Category_Seller extends Model<
      InferAttributes<Category_Seller>,
      InferCreationAttributes<Category_Seller>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    declare id: CreationOptional<number>;
    declare name: string;
    declare image: string;
  }
  
  // Exportamos una funcion que define el modelo
  // Luego le injectamos la conexion a sequelize.
  module.exports = (sequelize: Sequelize) => {
    // defino el modelo
    Category_Seller.init(
  
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          unique: true,
          primaryKey:true,
        },
  
        name: {
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
        sequelize,
        tableName: path.basename(__filename, path.extname(__filename)).toLowerCase(),
        timestamps: false,
        paranoid: true,
      },
    );
  };