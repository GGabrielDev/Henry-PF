import { Sequelize, Model, ModelCtor } from "sequelize";
import fs from "fs";
import path from "path";

const { DB_USER } = process.env || "postgres";
const { DB_PASSWORD } = process.env || "25412";
const { DB_HOST } = process.env || "localhost";
const { DB_PORT } = process.env || "5432";
const { DB_NAME } = process.env || "henry_pf";

const { DB_ROUTE } = process.env;

const sequelize = new Sequelize(
  DB_ROUTE
    ? DB_ROUTE
    : `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    ssl: true,
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
  Customer_Orders,
  Product,
  Review,
  Seller,
  User,
  Product_Amount,
  Cart,
  Recipt
} = sequelize.models;

// Aqui irian las declaraciones de las junction tables.
// -- Declare here.

// Aca vendrian las declaraciones de las relaciones
// Ejemplo: Product.hasMany(Reviews);
Seller.hasOne(User, { sourceKey: "id", foreignKey: "sellerId" });
User.belongsTo(Seller, { targetKey: "id" });

Product.belongsToMany(Category_Product, {
  through: "category_product_join",
});
Category_Product.belongsToMany(Product, {
  through: "category_product_join",
});
// Product.belongsToMany(User, {
//   through: "favorites",
//   as: "favoriteProduct",
// });
// User.belongsToMany(Product, {
//   through: "favorites",
//   as: "favoriteUser",
// });
Product.hasMany(Review, {
  sourceKey: "id",
  foreignKey: "productId",
  as: "reviews",
});
Review.belongsTo(Product, {
  targetKey: "id",
});

/*Countries.hasMany(User, {
  sourceKey: "id",
  foreignKey: "countryId",
  as: "users",
});

User.belongsTo(Countries, {
  targetKey: "id",
});*/

Seller.hasMany(Product, {
  sourceKey: "id",
  foreignKey: "sellerId",
  as: "products",
});
Product.belongsTo(Seller, {
  targetKey: "id",
});
User.hasMany(Review, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "reviews",
});
User.hasMany(Customer_Orders, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "customer_orders",
});
User.hasMany(Recipt, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "recipts",
});

Recipt.belongsTo(User, {
  targetKey: "id",
});

Product.hasMany(Recipt, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "recipts",
});

Recipt.belongsTo(Product, {
  targetKey: "id",
});

Cart.hasMany(Recipt, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "recipts",
});

Recipt.belongsTo(Cart, {
  targetKey: "id",
});

Seller.hasMany(Recipt, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "recipts",
});

Recipt.belongsTo(Seller, {
  targetKey: "id",
});

Customer_Orders.belongsTo(User, {
  targetKey: "id",
});

Review.belongsTo(User, {
  targetKey: "id",
});

Product.hasMany(Product_Amount,{
  sourceKey:"id",
  foreignKey:"Product_AmountId",
  as: "product_amount",
});

Product_Amount.belongsTo(Product,{
  targetKey: "id",
});

Product_Amount.hasMany(Cart,{
  sourceKey:"id",
  foreignKey:"CartId",
  as: "cart",
});

Cart.belongsTo(Product_Amount,{
  targetKey: "id",
});

Customer_Orders.hasMany(Cart,{
  sourceKey:"id",
  foreignKey:"CartId",
  as: "cart",
});

Cart.belongsTo(Customer_Orders,{
  targetKey: "id",
});

Seller.hasMany(Cart,{
  sourceKey:"id",
  foreignKey:"CartId",
  as: "cart",
});

Cart.belongsTo(Seller,{
  targetKey: "id",
});



export const Models = sequelize.models; // Para importar un objeto con solo los modelos: import { Models } from "./db.js"
export default sequelize; // Para importar la conexión de Sequelize: import sequelize from './db.js';
