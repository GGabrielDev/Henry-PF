import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
    DataTypes,
  } from "sequelize";
  import path from "path";
  
  interface SellerModel
    extends Model<
      InferAttributes<SellerModel>,
      InferCreationAttributes<SellerModel>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: number;
    nombreNegocio: string;
    pay_Money: string;
    imageLogo: CreationOptional<string>;
    template_page: string;
  }
  
  // Exportamos una funcion que define el modelo
  // Luego le injectamos la conexion a sequelize.
  module.exports = (sequelize: Sequelize) => {
    // defino el modelo
    sequelize.define<SellerModel>(
      path.basename(__filename, path.extname(__filename)).toLowerCase(),
      {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },

        nombreNegocio: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isAlpha: true,
          }
        },
  
        pay_Money: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
  
        imageLogo: {
          type: DataTypes.STRING,
          validate: {
            isUrl: true,
          }
        },
        
        template_page: {
            type: DataTypes.ENUM("1", "2", "3")
        },
      },

      {
        timestamps: false,
        paranoid: true,
      },
    );
  };