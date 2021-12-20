const express = require("express");
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 5000;
const {MONGOURI} = require("./keys");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(MONGOURI,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
mongoose.connection.on("connected",()=>{
    console.log("connected to database");
})

mongoose.connection.on("error",(err)=>{
    console.log("error: ",err);
})

require("./models/user");

app.use(require("./routes/auth"));
app.use(require("./routes/vetting/auth"));

app.listen(PORT,()=>{
    console.log("server is running at port ",PORT);
})