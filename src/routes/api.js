import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";

const router = express.Router();
/**
 * 
 * @param {*} app : express app
 */
const initApiRoutes = (app) => {    
    // GET - READ, POST - CREATE, PUT - UPDATE, DELETE - D
    router.get("/test-api", apiController.testApi)
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)

    router.get("/users/read", userController.readUser)
    router.post("/users/create", userController.createUser)
    router.put("/users/update", userController.updateUser)
    router.delete("/users/delete", userController.deleteUser)
    return app.use("/api/v1/", router);
}
export default initApiRoutes;