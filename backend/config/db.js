require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGO_URL

function mongodbConnection() {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('mongodb is connected')
    })
    .catch((e) => {
      console.log(e)
    })
}

module.exports = mongodbConnection
