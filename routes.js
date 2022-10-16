const Router = require("express").Router();

const pythonRoutes = require("./src/pythonmanagement/routes");

module.exports = () => 
    Router
    .get("/", (req, res)=> {
        res.status(200).send("Hey! I am up, start using me.")
    })
    .use(pythonRoutes())
    .all('*', (req, res)=> {
        res.status(404).send(`${req.path} doesn't exist. Please re-verify once.`);
    })
