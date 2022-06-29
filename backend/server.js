const app = require("./app")
const mongoose=require('mongoose');
const connectDatabase = require("./config/database");

// Handling Uncaught Execptions
process.on("uncaughtException", err=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Execption`)

    process.exit(1)
})

// Connecting to Database
connectDatabase();

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
})

// Unhandled Promise Rejections
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Unhandled Promise Rejection`)

    server.close(()=>{
        process.exit(1)
    })
})