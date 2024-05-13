const concurrency = require("./Concurrency");

jest.spyOn(concurrency, "limitConcurrency");

it("should limit concurrency correctly", async () => {
  const testUrls = [
    "https://jsonplaceholder.typicode.com/comments/10",
    "https://jsonplaceholder.typicode.com/comments/10",
    "https://jsonplaceholder.typicode.com/comments/10",
    "https://jsonplaceholder.typicode.com/comments/10",
    "https://jsonplaceholder.typicode.com/comments/10",
  ];
  const MAX_CONCURRENCY = 2;
  await concurrency.fetchWithConcurrency(testUrls, MAX_CONCURRENCY);

  expect(concurrency.limitConcurrency).toHaveBeenCalledTimes(
    Math.ceil(testUrls.length / MAX_CONCURRENCY)
  );
}, 10000);
