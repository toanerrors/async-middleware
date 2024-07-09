# @toanerrors/async-middleware

Async middleware for Express

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Introduction

`@toanerrors/async-middleware` is a lightweight library that enhances Express applications with support for asynchronous middleware. This library wraps asynchronous request handlers to ensure that errors are properly passed to Express's error handling middleware.

## Installation

You can install this library using npm:

```bash
npm install @toanerrors/async-middleware
```

or using yarn:

```bash
yarn add @toanerrors/async-middleware
```

or using bun:

```bash
bun add @toanerrors/async-middleware
```

## Usage

To use @toanerrors/async-middleware, simply import the asyncMiddleware function and apply it to your Express application. This will enhance the specified HTTP methods to support asynchronous request handlers.

```ts
import express from "express";
import { asyncMiddleware } from "@toanerrors/async-middleware";

const app = express();
asyncMiddleware(app);

app.get("/", async (req, res) => {
  // Your asynchronous code here
  throw new Error("Something went wrong");
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

using with express.Router

````ts
import express from "express";
import { asyncMiddleware } from "@toanerrors/async-middleware";

const router = express.Router();

asyncMiddleware(router);

router.get("/", async (req, res) => {
  // Your asynchronous code here
  throw new Error("Something went wrong");
});

router.listen(3000, () => {
  console.log("Server is running on port 3000");
})

## Configuration

The asyncMiddleware function accepts an optional configuration object that allows you to specify which HTTP methods should be enhanced with asynchronous support. By default, it supports the following methods: get, post, put, delete, and patch.

```ts
import express from "express";
import { asyncMiddleware } from "@toanerrors/async-middleware";

const app = express();
asyncMiddleware(app, {
  methods: ["get", "post"], // Only enhance GET and POST methods
});

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.post("/data", async (req, res) => {
  res.send("Data received");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
````

## Examples

```ts
import express from "express";
import { asyncMiddleware } from "@toanerrors/async-middleware";

const app = express();
asyncMiddleware(app);

app.get("/error", async (req, res) => {
  throw new Error("Test error");
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

Using with Multiple Handlers

```ts
import express from "express";
import { asyncMiddleware } from "@toanerrors/async-middleware";

const app = express();
asyncMiddleware(app);

const firstHandler = async (req, res, next) => {
  console.log("First handler");
  next();
};

const secondHandler = async (req, res) => {
  res.send("Second handler");
};

app.get("/", firstHandler, secondHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

MIT License
Copyright (c) 2024 toanerrors
