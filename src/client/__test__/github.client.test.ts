import { GitHubClient } from '@src/client/github.client'
import axios from 'axios'
import pythonFixture from './githubPythonFixture.json'

jest.mock('axios')

describe('Github API client', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  it('should return a list of the main repositories', async () => {
    // Arrange
    mockedAxios.get.mockResolvedValue({ data: pythonFixture })
    const githubClient = new GitHubClient(mockedAxios)
    // Act
    const response = await githubClient.fetchRepositories('python')
    // Asssert
    expect(response.data.items).toEqual(pythonFixture.items)
  })

  it('should return a list of five repositories', async () => {
    // Arrange
    mockedAxios.get.mockResolvedValue({ data: pythonFixture })
    const githubClient = new GitHubClient(mockedAxios)
    // Act
    const response = await githubClient.fetchRepositories('python')
    // Asssert
    expect(response.data.items).toHaveLength(5)
  })

  it('should return a validation error when the language does not exist', async () => {
    // Arrange
    mockedAxios.get.mockRejectedValue({
      response: {
        data: { message: 'Validation Failed' },
      },
    })
    const githubClient = new GitHubClient(mockedAxios)

    // Act & Assert
    await expect(githubClient.fetchRepositories('pithonn')).rejects.toThrow(
      'Unexpected error returned by the GitHub API: Validation Failed'
    )
  })

  it('should return a network error if the request fails', async () => {
    // Arrange
    mockedAxios.get.mockRejectedValue({ message: 'Network Error' })
    const githubClient = new GitHubClient(mockedAxios)

    // Act & Assert
    await expect(githubClient.fetchRepositories('ruby')).rejects.toThrow(
      'Unexpected error when trying to communicate to GitHub API: Network Error'
    )
  })
})
