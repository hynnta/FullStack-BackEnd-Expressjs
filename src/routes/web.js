import express from "express";
import homeController  from "../controller/homeController";

const router = express.Router();
/**
 * 
 * @param {*} app : express app
 */
const initWebRoutes = (app) => { 
    router.get("/", homeController.handleHello)
    router.get("/users", homeController.hendleUser)
    router.post("/users/create-user", homeController.handleCreateUser)
    return app.use("/", router);
}
export default initWebRoutes;