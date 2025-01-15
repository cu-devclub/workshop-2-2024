const express = require("express");
const app = express();
const port = require("./src/configs/general.config").port || 5000;

const {errorHandle} = require("./src/middlewares/error.middleware")
const {log} = require("./src/middlewares/log.middleware")
const init = require("./src/services/init.service")

const v1 = require("./src/routes/v1.route")

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

console.log(init.database())

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
})

app.use(errorHandle);
app.use(log)

app.use("/v1", v1)

app.listen(port, (err) => {
    if(!err){
        console.log("Listening on port: " + port)
    }else{
        console.log("There is a problem when starting up: " + err)
    }
})