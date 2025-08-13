import mongoose from 'mongoose'
import chalk from 'chalk'

let isConnected = false

export const connectDB = async (uri) => {
  if (isConnected) {
    console.log(chalk.yellow('MongoDB already connected'))
    return
  }

  try {
    await mongoose.connect(uri)
    isConnected = true
    console.log(chalk.green('MongoDB connected'))
  } catch (error) {
    console.log(chalk.red('MongoDB connection failed:', error.message))
    throw error
  }
}
