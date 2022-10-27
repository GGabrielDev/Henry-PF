import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
    DataTypes,
  } from "sequelize";
  import path from "path";
  
  interface ProductModel
    extends Model<
      InferAttributes<ProductModel>,
      InferCreationAttributes<ProductModel>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<string>;
    name: string;
    description: string;
    price_dollar: number;
    price_local: number;
    stock: string;
    image: CreationOptional<string>;
    suspended: boolean;
    tamano: string;
  }
  
  // Exportamos una funcion que define el modelo
  // Luego le injectamos la conexion a sequelize.
  module.exports = (sequelize: Sequelize) => {
    // defino el modelo
    sequelize.define<ProductModel>(
      path.basename(__filename, path.extname(__filename)).toLowerCase(),
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
  
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isAlphanumeric: true,
          }
        },

        price_dollar: {
            type: DataTypes.FLOAT(8,2),
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },

        price_local:{
            type: DataTypes.FLOAT(8,2),
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },

        description: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            isAlphanumeric: true,
          }
        },

        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isNumeric: true
            }
        },
  
        image: {
          type: DataTypes.STRING,
          validate: {
            isUrl: true,
          }
        },

        suspended: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },

        tamano:{
          type: DataTypes.ENUM("XS", "S", "M", "L", "XL", "Null"),
          allowNull: true,
          defaultValue: null,
        }
      },
      {
        timestamps: false,
        paranoid: true,
      },
    );
  };