import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  DataTypes,
} from "sequelize";
import path from "path";

class Review extends Model<
  InferAttributes<Review>,
  InferCreationAttributes<Review>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<string>;
  declare body: string;
  declare score: string;// timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  Review.init(

    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: true,
        }
      },

      score: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNull: false,
        validate: {
          isNumeric: true
        }
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,

    },
    {
      sequelize,
      tableName: path.basename(__filename, path.extname(__filename)).toLowerCase(),
      timestamps: true,
      paranoid: true,
    },
  );
};