/* eslint-disable no-console */
console.assert(!!process.env.REACT_APP_API_URL, 'API_URL not specified during build')

export const config = {
  API_URL: process.env.REACT_APP_API_URL
}
