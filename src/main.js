import "./config/env.config.js";
import express from "express";
import envConfig from "./config/env.config.js";
import dbConnection from "./DB/db.connection.js";
import { globalErrorHandler } from "./Middlewares/index.js";
import * as controllers from "./Modules/index.js";
import { decrypt, encrypt } from './Common/index.js';

const app = express();
const port = envConfig.app.PORT;

dbConnection();

app.use(express.json());

app.use("/api/auth", controllers.authController);
app.use("/api/messages", controllers.messageController);
app.use("/api/users", controllers.userController);

app.get("/", (req, res) => {
  res.send("sarahah app is running");
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const encrypteData = encrypt("Hello, World!");
const decrypted = decrypt(encrypteData)
console.log({ encrypteData, decrypted });



