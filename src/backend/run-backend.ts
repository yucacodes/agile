import { AgileServer } from './infrastructure/agile-server'

const server = new AgileServer()
server.run({ port: 3000 })
