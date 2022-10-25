import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
    DataTypes,
} from "sequelize";
import path from "path";

// Usar la API del PI, https://restcountries.com/#api-endpoints-v3-code

interface CountriesModel
    extends Model<
        InferAttributes<CountriesModel>,
        InferCreationAttributes<CountriesModel>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<string>;
    nameSpanish: string;
    name: string;
    code: string;
    callingCode: number;
    flag: string;
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize: Sequelize) => {
    // defino el modelo
    sequelize.define<CountriesModel>(
        path.basename(__filename, path.extname(__filename)).toLowerCase(),
        {
            id: {
                type: DataTypes.NUMBER,
                defaultValue: DataTypes.NUMBER,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlpha: true,
                }
            },

            nameSpanish: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlpha: true,
                }
            },

            code: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isNumeric: true,
                }
            },

            callingCode: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isNumeric: true,
                }
            },

            flag: {
                type: DataTypes.STRING,
                allowNull: true,
                validate:{
                    isUrl: true,
                }
              },

        },
        {
            timestamps: false,
            paranoid: true,
        },
    );
};
