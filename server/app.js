require("dotenv").config();
require("./db/conn");
const users = require("./models/userSchema");
const router = require("./routes/router");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})