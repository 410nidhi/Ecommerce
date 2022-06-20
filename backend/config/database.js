const mongoose = require("mongoose")

const connectDatabase =() => {
    mongoose.connect('mongodb://localhost:27017/Ecommerce',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(data=>{console.log("Connected Database!")})
}

module.exports = connectDatabase;