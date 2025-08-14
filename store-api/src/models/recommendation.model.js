import mongoose from 'mongoose'

const recommendationSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chats',
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const Recommendation = mongoose.model('Recommendations', recommendationSchema)

export { Recommendation }
