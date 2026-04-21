# Proxy Calculator Starter

This project is a TanStack Start application scaffolded from the Calculator template and extended with a Netlify serverless proxy endpoint.

## What It Does

- Shows a calculator UI on the home page.
- Proxies requests when a domain is placed after `/` in the URL.
- Example: visiting `/example.com/path` forwards the request to `http://example.com/path`.

## Key Technologies

- TanStack Start
- React 19
- TanStack Router v1
- TypeScript 5 (strict)
- Vite 7
- Tailwind CSS 4
- Netlify Functions

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Optional Netlify local emulation (port `8888`):

```bash
/opt/buildhome/node-deps/node_modules/.bin/netlify dev
```
