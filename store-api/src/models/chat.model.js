import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    message: {
      type: String,
      required: true
    },
    reply: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const Chat = mongoose.model('Chats', chatSchema)

export { Chat }
