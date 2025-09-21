const mongoose = require('mongoose')

const Connection = async () => {
    try {
       const connect = await mongoose.connect(process.env.ATLAS_URI)
       console.log(`data base connected successfully,${process.env.PORT}`); 
    } catch (error) {
        console.log('db not connect')
    }
}

module.exports = Connection;