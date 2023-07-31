const mongoose = require('mongoose');
//Database connection
mongoose.connect('mongodb://127.0.0.1:27017/crud_mern',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(()=>console.log("Database is connected"))
.catch((err)=>console.log(err))