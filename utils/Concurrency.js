async function fetchUrl(responses, url) {
  const response = await fetch(url);
  const data = response;
  responses.push(data);
}

exports.limitConcurrency = async (responses, urls, MAX_CONCURRENCY) => {
  const urlProcess = [...urls];
  const batch = urlProcess.splice(0, MAX_CONCURRENCY);
  await Promise.all(batch.map((url) => fetchUrl(responses, url)));

  if (urlProcess.length > 0) {
    await exports.limitConcurrency(responses, urlProcess, MAX_CONCURRENCY);
  }
};

exports.fetchWithConcurrency = async (urls, MAX_CONCURRENCY) => {
  const responses = [];
  await exports.limitConcurrency(responses, urls, MAX_CONCURRENCY);
  return responses;
};
