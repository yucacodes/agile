import { AgileServer } from './infrastructure/server'

import './inject-implementations'

const server = new AgileServer()
server.run({ port: 3000 })
