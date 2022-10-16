const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000;

const routes = require("./routes")
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '10mb'}))
app.use(routes())

app.listen(PORT, () => {
    console.info(`Server is up and running on Port: ${PORT}.`)
})