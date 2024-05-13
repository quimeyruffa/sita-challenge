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
