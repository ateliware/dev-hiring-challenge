import axios from 'axios'

const githubApi = axios.create({
  baseURL: process.env.GITHUB_BASE_URL,
  headers: process.env.GITHUB_AUTH_TOKEN
    ? {
        Authorization: `token ${process.env.GITHUB_AUTH_TOKEN}`
      }
    : null
})

export { githubApi }
