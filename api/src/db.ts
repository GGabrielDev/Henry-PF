import { Sequelize, Model, ModelCtor } from "sequelize";
import fs from "fs";
import path from "path";

const { DB_USER } = process.env || "postgres";
const { DB_PASSWORD } = process.env || "postgres";
const { DB_HOST } = process.env || "localhost";
const { DB_PORT } = process.env || "5432";
const { DB_NAME } = process.env || "henry_pf";

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

// Test function to check the connectivity to the database.
export const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const basename = path.basename(__filename);

const modelDefiners: ((arg0: Sequelize) => Model)[] = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
const modelFilenames = fs
  .readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );
modelFilenames.forEach((file) =>
  modelDefiners.push(require(path.join(__dirname, "/models", file)))
);

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => {
  model(sequelize);
});

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Category_Product,
  Category_Seller,
  Countries,
  Product,
  Review,
  Seller,
  User,
} = sequelize.models;

// Aqui irian las declaraciones de las junction tables.
// -- Declare here.

// Aca vendrian las declaraciones de las relaciones
// Ejemplo: Product.hasMany(Reviews);
User.hasOne(Seller, { sourceKey: "userId" });
Seller.belongsTo(User, { targetKey: "userId" });
Product.belongsToMany(Category_Product, {
  targetKey: "productId",
  through: "category_product_join",
});
Category_Product.belongsToMany(Product, {
  targetKey: "categoryId",
  through: "category_product_join",
});
Product.hasMany(Review, {
  foreignKey: "productId",
});
Review.belongsTo(Product, {
  targetKey: "productId",
});
Countries.hasMany(User, {
  foreignKey: "userId",
});
User.belongsTo(Countries, {
  targetKey: "userId",
});
Category_Seller.hasMany(Seller, {
  foreignKey: "categoryId",
});
Seller.belongsTo(Category_Seller, {
  targetKey: "categoryId",
});
Seller.hasMany(Product, {
  foreignKey: "sellerId",
});
Product.belongsTo(Seller, {
  targetKey: "sellerId",
});
User.hasMany(Review, {
  foreignKey: "userId",
}),
  Review.belongsTo(User, {
    targetKey: "userId",
  });

export const Models = sequelize.models; // Para importar un objeto con solo los modelos: import { Models } from "./db.js"
export default sequelize; // Para importar la conexión de Sequelize: import sequelize from './db.js';
