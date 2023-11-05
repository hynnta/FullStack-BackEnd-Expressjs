import express from "express";
import apiController from "../controller/apiController";

const router = express.Router();
/**
 * 
 * @param {*} app : express app
 */
const initApiRoutes = (app) => {    
    // GET - READ, POST - CREATE, PUT - UPDATE, DELETE - D
    router.get("/test-api", apiController.testApi)
    router.post("/register", apiController.handleRegister)
    return app.use("/api/v1/", router);
}
export default initApiRoutes;