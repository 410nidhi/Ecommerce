const app = require("./app")
const mongoose=require('mongoose');
const connectDatabase = require("./config/database");

connectDatabase();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
})