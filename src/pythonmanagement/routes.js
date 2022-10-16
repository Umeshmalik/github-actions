const Router = require("express").Router();
const controller = require("./controller");

module.exports = () => {
    Router
        .route('/python')
        .post(controller?.compilePython)
    
    return Router;
}