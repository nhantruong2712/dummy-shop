# DummyShop

Simple product browser with favorites functionality. Built with Angular 20.

## Features

- Login system with JWT
- Get products
- Add/remove favorites

## Tech Stack

- Angular 20
- NgRx for state management
- Angular Material
- TypeScript
- Node 22

## Getting Started

```bash
npm install --legacy-peer-deps
npm start
```

Open http://localhost:4200

## Demo Login

- Username: `emilys`
- Password: `emilyspass`

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run e2e
```

## Most Complex parts
Actually, these are quite simple since there are not too many functions/features. If there is a one complex, it's Ngrx

## Note
This project doesn't require about pagination, but there are 194 products in total. So I think we should apply pagination/virtual scrolling for better performance.