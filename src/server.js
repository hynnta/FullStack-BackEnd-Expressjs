import express from "express";
import viewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from 'body-parser';
const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
viewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config web routes
initWebRoutes(app);


app.listen(PORT, () => { 
    console.log("backend running = " + PORT);
})