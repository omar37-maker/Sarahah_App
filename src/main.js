import "./config/env.config.js";
import express from "express";
import envConfig from "./config/env.config.js";
import dbConnection from "./DB/db.connection.js";
import { globalErrorHandler } from "./Middlewares/index.js";
import * as controllers from "./Modules/index.js";
import { NotFoundException } from "./Common/index.js";
import { corsOptions } from "./config/cors.config.js"; 
import cors from "cors"


const app = express();
const port = envConfig.app.PORT;

dbConnection();

app.use(cors(corsOptions))

app.use('/uploads', express.static('uploads'))

app.use(express.json());

app.use("/api/auth", controllers.authController);
app.use("/api/messages", controllers.messageController);
app.use("/api/users", controllers.userController);

app.get("/", (req, res) => {
  res.send("sarahah app is running");
});

app.use((req, res, next) => {
  throw new NotFoundException('This router is not found', {path:req.path})
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port `, port);
});





