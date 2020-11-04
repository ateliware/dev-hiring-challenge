describe('Auth tests e2e', () => {
  describe('When create a user', () => {
    // Arrange
    const user = {
      username: 'jondoe',
      fullname: 'Jon Doe',
      email: 'jondoe@email.com',
      password: 'password',
    }

    it('should return a object normalized', async () => {
      // Act
      const response = await global.appRequest.post('/auth/signup').send(user)
      // Assert
      expect(response.body).toEqual(
        expect.objectContaining({
          username: 'jondoe',
          fullname: 'Jon Doe',
          email: 'jondoe@email.com',
          languages: [],
          id: expect.any(Number),
        })
      )
    })

    it('should return a object without property password', async () => {
      // Act
      const response = await global.appRequest.post('/auth/signup').send(user)
      // Assert
      expect(response.body).not.toHaveProperty('password')
    })

    it('should return a object with property languages', async () => {
      // Act
      const response = await global.appRequest.post('/auth/signup').send(user)
      // Assert
      expect(response.body).toHaveProperty('languages')
    })

    it('should return a object with auth-token header', async () => {
      // Act
      const response = await global.appRequest.post('/auth/signup').send(user)

      // Assert
      expect(response.header).toEqual(
        expect.objectContaining({ 'auth-token': expect.any(String) })
      )
    })

    it('should return 422 when there is a validation error', async () => {
      // Arrange
      const user = {
        username: 'jondoe',
        fullname: 'Jon Doe',
        email: '',
        password: '',
      }
      // Act
      const response = await global.appRequest.post('/auth/signup').send(user)

      // Assert
      expect(response.status).toEqual(422)

      expect(response.body.code).toEqual(422)
    })
  })
})
