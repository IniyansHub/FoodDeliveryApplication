const express = require('express');
const router = require('./router');
const app = express();
const cors = require('cors')

app.use(express.json())

app.use(cors())

app.use('/api',router)
    

app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000"); 
});