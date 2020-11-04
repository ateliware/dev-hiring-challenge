describe('findTopRepositories endpoint test', () => {
  // Arrange
  const user = {
    username: 'johndoe',
    fullname: 'John Doe',
    email: 'johndoe@email.com',
    password: 'password',
  }
  const userLogin = {
    email: 'johndoe@email.com',
    password: 'password',
  }
  const body = {
    languages: ['go', 'python', 'java', 'typescript', 'elixir'],
  }

  it('should return status 200 on post languages array', async () => {
    // Act
    await global.appRequest.post('/auth/signup').send(user)
    const responseSignin = await global.appRequest
      .post('/auth/signin')
      .send(userLogin)

    const response = await global.appRequest
      .post('/api/repos')
      .send(body)
      .set('auth-token', responseSignin.header['auth-token'])

    expect(response.status).toEqual(200)
  })

  it('should return an array with length 25', async () => {
    // Act
    await global.appRequest.post('/auth/signup').send(user)
    const responseSignin = await global.appRequest
      .post('/auth/signin')
      .send(userLogin)

    const response = await global.appRequest
      .post('/api/repos')
      .send(body)
      .set('auth-token', responseSignin.header['auth-token'])

    expect(response.body).toHaveLength(25)
  })
})
