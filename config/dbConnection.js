const mongoose = require('mongoose')

const Connection = async () => {
    try {
       const connect = await mongoose.connect(process.env.ATLAS_URI)
       console.log(`Database connected successfully, Server running on port ${process.env.PORT}`); 
    } catch (error) {
        console.log('Database connection failed:', error.message)
        process.exit(1)
    }
}

module.exports = Connection