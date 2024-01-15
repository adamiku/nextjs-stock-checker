# Stock Checker

Simple React frontend application for checking US stocks available here: https://nextjs-stock-checker.vercel.app/

Used 2 financial API:

- Finnhub apis, here you can find the docs: https://finnhub.io/docs/api/introduction
- Alpha Vantage apis, here you can find the docs: https://www.alphavantage.co/documentation/

\*Note I had to find another free api for the historical data as it is a premium / behind paywall feature on Finnhub

## Project setup, getting started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Architecture, design points

- Mobile first, responsive layout
- URL as single source of truth:
  - Specific query can be bookmarked
  - It will be shareable
  - It will persist the query, after refresh, no additional state management or localstorage is needed
- Feature-driven folder structure ([Screaming Architecture](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html))
- Next.js because the api tokens could not be exposed to the client
- Deployed to Vercel as it is the most easier approach and it couldnt break any other requirement
- With Next.js I have heavily utilized React Server Components
- Used githooks with husky to automate processes like linting, testing, conventional commit forcing

## Improvements for the product

- THE most important Light / Dark mode :)
- option to choose other stock exchanges as well not just US
- favourites feature with auth
- monitoring and alert for stocks
- normalize lowercase and uppercase data
- autocomplete for search
- multiple timeframes for the charts (daily, weekly, yearly)
- basic indicators
- social media sharing

## Improvements for the codebase

- identify and cover the core functionalities with E2E tests (happy paths)
- increase testing coverage and check coverage after each commit, write integration tests
- create storybook
- lazy load chart related code
- optimize caching for the heavy ticker api response and improve lookup by restructuring the response data
- to be able to utilize static site rendering and partial prerendering (new feature of Next.js) the url structure could be refactored
- create a Contribute.md to highlight how someone can contribute to the project
- Dockerize if it is needed
