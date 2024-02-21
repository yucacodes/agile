import { createClient } from 'redis'

export const repositoriesRedisClient = createClient({
  url: 'redis://localhost:6379/0',
})

repositoriesRedisClient.on('error', (err) =>
  console.log('Redis Client Error', err)
)
