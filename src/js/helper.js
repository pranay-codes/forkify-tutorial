import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, request = undefined) {
  try {
    const result = request
      ? await Promise.race([
          fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
          }),
          timeout(TIMEOUT_SEC),
        ])
      : await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    const data = await result.json();

    if (!result.ok)
      throw new Error(
        `Error fetching recipe: ${data.message} (${result.status})`
      );

    return data;
  } catch (err) {
    throw err;
  }
};
/* 
export const getJSON = async function (url) {
  try {
    const result = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await result.json();

    if (!result.ok)
      throw new Error(
        `Error fetching recipe: ${data.message} (${result.status})`
      );

    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, request) {
  try {
    const result =
    const data = await result.json();

    if (!result.ok)
      throw new Error(
        `Error fetching recipe: ${data.message} (${result.status})`
      );

    return data;
  } catch (err) {
  }
}; */
