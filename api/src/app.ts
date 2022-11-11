import express, { NextFunction, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes";
import errorHandler from "./middleware/error.middleware";
import cors from "cors";
import { auth } from 'express-openid-connect';

require("./db.js");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3001',
  clientID: 'lKP4CRJ2bJHEnDa3peIfaqS3vNzHeyU3',
  issuerBaseURL: 'https://dev-n1wylph86zq3zbjr.us.auth0.com'
};

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
express.json({ limit: "50mb" });
const server = express();

server.use(auth(config));
server.use(cors(corsOptions));
server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));
server.use((_, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use(errorHandler);

export default server;
