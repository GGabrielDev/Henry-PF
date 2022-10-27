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

class Countries extends Model<
    InferAttributes<Countries>,
    InferCreationAttributes<Countries>
> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    declare id: CreationOptional<number>;
    declare name_spanish: string;
    declare name: string;
    declare code_cca3: string;
    declare mobile_zone: number;
    declare flag: string;
    declare code_currencies: string;
}

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize: Sequelize) => {
    // defino el modelo
    Countries.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlpha: true,
                }
            },

            name_spanish: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlpha: true,
                }
            },

            code_cca3: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlpha: true,
                }
            },

            mobile_zone: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isNumeric: true,
                }
            },

            flag: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl: true,
                }
            },

            code_currencies: {
                type: DataTypes.STRING,
                allowNull: false,
            },

        },
        {
            sequelize,
            tableName: path.basename(__filename, path.extname(__filename)).toLowerCase(),
            timestamps: false,
            paranoid: true,
        },
    );
};
