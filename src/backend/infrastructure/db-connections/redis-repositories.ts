import { createClient } from 'redis'

export const redisRepositoriesClient = createClient({
  url: 'redis://localhost:6379/0',
})

redisRepositoriesClient.on('error', (err) =>
  console.log('Redis Client Error', err)
)
