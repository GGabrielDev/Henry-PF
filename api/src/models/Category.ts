import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
    DataTypes,
  } from "sequelize";
  import path from "path";
  
  interface CategoryModel
    extends Model<
      InferAttributes<CategoryModel>,
      InferCreationAttributes<CategoryModel>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<string>;
    name: string;
  }
  
  // Exportamos una funcion que define el modelo
  // Luego le injectamos la conexion a sequelize.
  module.exports = (sequelize: Sequelize) => {
    // defino el modelo
    sequelize.define<CategoryModel>(
      path.basename(__filename, path.extname(__filename)).toLowerCase(),
      {
        id: {
          type: DataTypes.NUMBER,
          defaultValue: DataTypes.NUMBER,
          unique: true,
          validate:{
            isNumeric: true,
          }
        },
  
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isAlphanumeric: true,
          }
        },
      },
      {
        timestamps: false,
        paranoid: true,
      },
    );
  };