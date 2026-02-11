import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { generateOpenApi } from './generator'

const app = new Hono()

app.use('*', cors())

app.post('/generate', async (c) => {
  const body = await c.req.json()
  const schema = generateOpenApi(body)
  return c.json(schema)
})


Bun.serve({
  port: 7000,
  fetch: app.fetch
})
console.log('Server running on http://localhost:7000')