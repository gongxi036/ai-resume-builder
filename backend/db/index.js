import mongoose from 'mongoose'

const connectMongoDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL)
    console.log(`MongoDB connected: ${con.connection.host}`)
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`)
    process.exit(1)
  }
}

export default connectMongoDB
