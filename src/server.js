import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
require("dotenv").config();
import bodyParser from 'body-parser';
import configCors from "./config/cors";
// import testConnectDB from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8080;

//config cors
configCors(app);

//config view engine
viewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connectDB
// testConnectDB();

//config web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => { 
    console.log("backend running = " + PORT);
})