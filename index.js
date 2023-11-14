const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const mongo_URI = process.env.MONGO_URL;

mongoose
.connect(mongo_URI)
.then((x)=>{
    console.log(`Connected to Mongo Database name: "${x.connections[0].name}"`)
})
.catch((err)=> {
    console.error('Error connect to mongo',err.reason)
})
//VdeFyjed6b5nl9X2


const employeeRoute = require('./routes/employee.route.js');
const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
)
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')))
app.use('/',express.static(path.join(__dirname, 'dist/mean-stack-crud-app')))
app.use('/api',employeeRoute);

const port = process.env.PORT || 4000
const server = app.listen(port, ()=> {
    console.log('Connected to port ' + port);
})

app.use((req,res,next)=> {
    next(createError(404))
});

app.use(function (err,req,res,next) {
    console.error(err.message)
    if(!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})


