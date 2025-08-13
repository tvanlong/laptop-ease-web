import redis from '~/configs/redisClient'

export const cacheMiddleware = (baseKey, ttl = 60) => {
  return async (req, res, next) => {
    try {
      // GET → kiểm tra cache
      if (req.method === 'GET') {
        const cacheKey = `${baseKey}:${req.originalUrl}`
        const cachedData = await redis.get(cacheKey)

        if (cachedData) {
          return res.json(JSON.parse(cachedData))
        }

        const originalJson = res.json.bind(res)

        res.json = async (data) => {
          await redis.set(cacheKey, JSON.stringify(data), 'EX', ttl)
          return originalJson(data)
        }

        return next()
      }

      // POST → xóa cache danh sách
      if (req.method === 'POST') {
        const listKey = `${baseKey}:/api/${baseKey}`
        await redis.del(listKey)
      }

      // PUT hoặc DELETE → xóa cache danh sách + cache chi tiết id
      if (['PUT', 'DELETE'].includes(req.method)) {
        const idKey = `${baseKey}:/api/${baseKey}/${req.params.id}`
        const listKey = `${baseKey}:/api/${baseKey}`
        await redis.del(listKey, idKey)
      }

      return next()
    } catch (err) {
      next()
    }
  }
}
