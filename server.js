const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose=require('mongoose');
const passport=require("passport");
const path= require('path');

require('dotenv').config();

const app = express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json({limit:'50mb'}));
// app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
    next();
});
app.use(express.static(path.join(__dirname, "client", "build")));

const uri = process.env.ATLAS_URI;
// mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});
// const connection= mongoose.connection;

// connection.once('open',()=>{
//     console.log("MongoDB database connection established successfully!");
// })
// Passport middleware
// app.use(passport.initialize());
//
// require("./config/passport")(passport);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port,()=>{
    console.log(`server is running on port:${port}`);
});
