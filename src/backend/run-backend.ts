import { AgileServer } from './infrastructure/server'

const server = new AgileServer()
server.run({ port: 3000 })
