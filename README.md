# Concurrent URL Fetcher

This module provides functions to perform concurrent retrieval of multiple URLs, limiting the number of simultaneous requests by a configurable maximum concurrency.

## Installation

To install this module, simply run:
```
npm install
```

## Compilation
```
npm start
```

## Run test
```
npm test
```

## Usage

```javascript
const { fetchWithConcurrency } = require("./utils/Concurrency.js");

const urls = [
  "https://jsonplaceholder.typicode.com/comments/10",
  "https://jsonplaceholder.typicode.com/comments/10",
  "https://jsonplaceholder.typicode.com/comments/10",
  "https://jsonplaceholder.typicode.com/comments/10",
  "https://jsonplaceholder.typicode.com/comments/10",
];
const MAX_CONCURRENCY = 2;

fetchWithConcurrency(urls, MAX_CONCURRENCY)
  .then((responses) => {
    console.log(responses);
  })
  .catch((error) => {
    console.error("Error fetching URLs:", error);
  });

```

This example uses `fetchWithConcurrency` to retrieve the specified URLs concurrently, limiting concurrency to a maximum of 2 simultaneous requests.

## API

### fetchWithConcurrency(urls: string[], MAX_CONCURRENCY: number): Promise\<Response[]\>

This function takes an array of URLs and a number representing the maximum allowed concurrent requests. It returns a promise that resolves with an array of responses corresponding to the requests made.

### limitConcurrency(responses: any[], urls: string[], MAX_CONCURRENCY: number): Promise<void>

This function is used internally by fetchWithConcurrency to limit the concurrency of HTTP requests.

## Test: Concurrency Limitation

This test ensures that the `fetchWithConcurrency` function properly limits the concurrency of HTTP requests.

```javascript
const concurrency = require("./Concurrency");

// Set up a spy to track calls to the limitConcurrency function
jest.spyOn(concurrency, "limitConcurrency");

it("should limit concurrency correctly", async () => {
  // Define an array of test URLs
  const testUrls = [
    "https://jsonplaceholder.typicode.com/comments/10",
    "https://jsonplaceholder.typicode.com/comments/10",
    "https://jsonplaceholder.typicode.com/comments/10",
    "https://jsonplaceholder.typicode.com/comments/10",
    "https://jsonplaceholder.typicode.com/comments/10",
  ];

  // Set the maximum concurrency
  const MAX_CONCURRENCY = 2;

  // Call the fetchWithConcurrency function
  await concurrency.fetchWithConcurrency(testUrls, MAX_CONCURRENCY);

  // Expect the limitConcurrency function to be called the expected number of times
  expect(concurrency.limitConcurrency).toHaveBeenCalledTimes(
    Math.ceil(testUrls.length / MAX_CONCURRENCY)
  );
}, 10000); // Set a timeout of 10 seconds for the test
```
