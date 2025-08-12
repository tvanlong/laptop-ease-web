import dotenv from 'dotenv'

dotenv.config()

const WHITELIST_DOMAINS = [process.env.URL_CLIENT_DEPLOY, process.env.URL_ADMIN_DEPLOY]

// Cấu hình CORS Option
export const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.BUILD_MODE === 'dev') {
      return callback(null, true)
    }

    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    if (origin === undefined) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  },

  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,

  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // CORS sẽ cho phép nhận cookies từ request
  credentials: true
}
