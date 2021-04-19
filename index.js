const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;
const employees = require('./employees')
const prospects = require('./prospects')
const applications = require('./applications')

app.use(bodyParser.json());

// Para evitar el horroroso error de CORS
app.use(cors());
app.use('/employees', employees)
app.use('/prospects', prospects)
app.use('/applications', applications)

app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
}) 

app.use((err,req,res,next)=>{
    console.error(err.stack);
    return res.status(500).json({
        "name":err.name,
        "message": `${err.message}, ${err.original ? err.original : ':('}`,
    })
})