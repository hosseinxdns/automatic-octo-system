const HOST_PATTERN = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,63}(?::\d{1,5})?$/

export default async (req: Request, context: { params?: Record<string, string | undefined> }) => {
  try {
    const address = context.params?.address ?? ''
    const splat = context.params?.splat ?? ''

    if (!address || !HOST_PATTERN.test(address)) {
      return new Response('Invalid or missing domain in path. Use /example.com or /example.com/some/path', {
        status: 400,
      })
    }

    const incomingUrl = new URL(req.url)
    const targetUrl = new URL(`http://${address}`)

    if (splat) {
      targetUrl.pathname = `/${splat}`
    }

    targetUrl.search = incomingUrl.search

    const headers = new Headers(req.headers)
    headers.delete('host')

    const proxiedRequest = new Request(targetUrl, {
      method: req.method,
      headers,
      body: req.body,
      redirect: 'follow',
      duplex: 'half',
    } as RequestInit)

    return fetch(proxiedRequest)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(`Proxy error: ${message}`, { status: 500 })
  }
}

export const config = {
  path: '/:address/:splat*',
  excludedPath: ['/.netlify/*', '/assets/*', '/favicon.ico'],
}
