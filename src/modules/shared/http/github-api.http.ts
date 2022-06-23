import axios from 'axios'

const githubApi = axios.create({
  baseURL: process.env.GITHUB_BASE_URL
})

export { githubApi }
