const path = require('path');
const express = require('express');
const Router = require("express").Router();

const pythonRoutes = require("./src/python/routes");
const nodeRoutes = require("./src/node/routes");
const javaRoutes = require("./src/java/routes");

module.exports = () => 
    Router
    .get("/health", (req, res)=> {
        console.log("Server is running.")
        res.status(200).sendFile(path.join(__dirname, 'static/index.html'))
    })
    .use("/python", pythonRoutes())
    .use("/node", nodeRoutes())
    .use("/java", javaRoutes())
    .all('*', (req, res)=> {
        res.status(404).send(`${req.path} doesn't exist. Please re-verify once.`);
    })
