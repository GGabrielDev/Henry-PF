import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  DataTypes,
} from "sequelize";
import path from "path";

class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string;
  declare price_dollar: number;
  declare price_local: number;
  declare stock: string;
  declare image: CreationOptional<string>;
  declare suspended: boolean;
  declare size: string;
  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  Product.init(
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
          is: /^[A-Za-z0-9\s]*$/,
        },
      },

      price_dollar: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
        validate: {
          isNumeric: true,
        },
      },

      price_local: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          is: /^[A-Za-z0-9\s]*$/,
        },
      },

      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
        },
      },

      image: {
        type: DataTypes.STRING,
        allowNull:true,
        validate: {
          isUrl: true,
        },
      },

      suspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      size: {
        type: DataTypes.ENUM("XS", "S", "M", "L", "XL", "Null"),
        allowNull: true,
        defaultValue: null,
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: path
        .basename(__filename, path.extname(__filename))
        .toLowerCase(),
      timestamps: true,
      paranoid: true,
    }
  );
};

