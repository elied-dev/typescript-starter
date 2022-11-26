/**
 * Sleep for `ms` seconds before continuing
 * Usage: await sleep(3000): wait for 3 seconds
 * @param ms milliseconds to sleep for
 * @returns
 */
export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
