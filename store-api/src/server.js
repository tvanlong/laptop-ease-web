/* eslint-disable no-console */
import chalk from 'chalk'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import passport from 'passport'
import { corsOptions } from '~/configs/cors'
import '~/configs/passport/facebook.passport'
import '~/configs/passport/google.passport'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import router from '~/routes'
import { connectDB } from '~/db/connect'

dotenv.config()
const { APP_PORT, MONGO_ATLAS_URI } = process.env

const app = express()
app.use(cookieParser())

// MemoryStore for session storage (prevents memory leaks)
const MemoryStore = require('memorystore')(session)

// Connect to MongoDB
connectDB(MONGO_ATLAS_URI)

// Middleware
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session middleware: Required for OAuth 2.0
app.use(
  session({
    secret: 'secret',
    resave: false,
    store: new MemoryStore({ checkPeriod: 86400000 }),
    saveUninitialized: true,
    cookie: { secure: process.env.BUILD_MODE === 'prod' ? true : false }
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/api', router)

// Middleware xử lý lỗi tập trung
app.use(errorHandlingMiddleware)

// GitHub Actions Keep-Alive Workflow
app.get('/health', (req, res) => {
  const userAgent = req.get('User-Agent')
  if (userAgent?.includes('GitHub-Actions')) {
    console.log(`Keep-alive ping at ${new Date().toISOString()}`)
  }

  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  })
})

// Error handler (production || development)
if (process.env.BUILD_MODE === 'prod') {
  app.listen(process.env.PORT, () => {
    console.log(chalk.greenBright(`Production: Server is running at Port:${process.env.PORT}`))
  })
} else {
  app.listen(APP_PORT, () => {
    console.log(chalk.greenBright(`Local Dev: Server is running at http://localhost:${APP_PORT}`))
  })
}
