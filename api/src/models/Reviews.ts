import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
    DataTypes,
  } from "sequelize";
  import path from "path";
  
  interface ReviewModel
    extends Model<
      InferAttributes<ReviewModel>,
      InferCreationAttributes<ReviewModel>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    uuid: CreationOptional<string>;
    title: string;
    body: string;
    score: string;
  }
  
  // Exportamos una funcion que define el modelo
  // Luego le injectamos la conexion a sequelize.
  module.exports = (sequelize: Sequelize) => {
    // defino el modelo
    sequelize.define<ReviewModel>(
      path.basename(__filename, path.extname(__filename)).toLowerCase(),
      {
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
  
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isAlphanumeric: true,
          }
        },

        body: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isAlphanumeric: true,
            }
          },

        score: {
            type: DataTypes.ENUM("1","2","3","4","5"),
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
    },
      {
        timestamps: false,
        paranoid: true,
      },
    );
  };