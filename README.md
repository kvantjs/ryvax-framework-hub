# Ryvax Framework Hub

Official website for **Ryvax.js**, an open-source React-first full-stack TypeScript framework for production web applications, deterministic APIs, server-side rendering, static generation, streaming, jobs, caching, authentication, observability, and portable Node.js deployment.

This repository contains the static marketing and ecosystem site for the Ryvax organization. It is built with React, TypeScript, Vite, Tailwind CSS, and Lucide icons, and is published automatically through GitHub Pages.

## Architecture

```text
Browser
  ↓
Vite static assets
  ↓
React application
  ├── marketing sections and framework positioning
  ├── interactive playground and scaffold generator
  ├── documentation quick-view modal
  └── responsive navigation and ecosystem links
```

The site is a frontend-only static application. It does not require a server, database, authentication provider, or runtime secret to render the public website. Any future backend integration must be added explicitly and must not expose private credentials in client-side code.

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The development server is configured to listen on `0.0.0.0` for preview environments.

## Validation and production build

```bash
npm run lint
npm run build
npm run preview
```

The production artifact is generated in `dist/` and is suitable for GitHub Pages or another static CDN.

## GitHub Pages

Every push to `main` runs [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). The workflow installs dependencies, runs TypeScript validation, creates the Vite production build, uploads `dist/` as a Pages artifact, and deploys it.

The Vite base path is relative (`./`) so the same artifact works at the repository Pages URL and at a future custom domain.

## Environment variables

The current public site does not require runtime secrets. `.env.example` is retained as a reference for future integrations. Never commit real API keys, tokens, or private credentials.

## Related projects

- [Ryvax.js framework](https://github.com/kvantjs/ryvax.js)
- [Ryvax.js npm package](https://www.npmjs.com/package/@kvantjs/ryvax.js)
- [Ryvax.js documentation](https://kvantjs.github.io/ryvax/)

## License

See the license included in the repository or contact the project maintainers before redistributing brand assets.
