import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  DataTypes,
} from "sequelize";
import path from "path";

class Recipt extends Model<
  InferAttributes<Recipt>,
  InferCreationAttributes<Recipt>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<number>
	declare mercadopagoId: string
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  Recipt.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
			mercadopagoId: {
				type: DataTypes.STRING,
				allowNull: true,
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
