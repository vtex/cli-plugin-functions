import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const GATSBY_PORT = 8000

export const proxyServer = (functionsPort: number, proxyPort: number) => {
  const app = express()

  app.use(
    '/functions',
    createProxyMiddleware({
      target: `http://localhost:${functionsPort}`,
      changeOrigin: true,
      pathRewrite: {
        '^/functions': '/', // remove base path
      },
    })
  )

  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: `http://localhost:${GATSBY_PORT}`,
      changeOrigin: true,
      ws: true,
    })
  )

  app.use(
    '/*',
    createProxyMiddleware({
      target: `http://localhost:${GATSBY_PORT}`,
      changeOrigin: true,
    })
  )

  app.listen(proxyPort)

  console.log(`Server listening at port: http://localhost:${proxyPort}`)
}
