const Router = require("express").Router();
const controller = require("./controller");

module.exports = () => {
    Router
        .route('/').post(controller?.compileJava)
    
    Router
        .route("/withInput").post(controller?.compileJavaWithInput)
    
    return Router;
}