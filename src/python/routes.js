const Router = require("express").Router();
const controller = require("./controller");

module.exports = () => {
    Router
        .route('/').post(controller?.compilePython)
    
    Router
        .route("/withInput").post(controller?.compilePythonWithInput)
    
    return Router;
}