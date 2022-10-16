const Router = require("express").Router();
const controller = require("./controller");

module.exports = () => {
    Router
        .route('/').post(controller?.compileNode)
    
    Router
        .route("/withInput").post(controller?.compileNodeWithInput)
    
    return Router;
}