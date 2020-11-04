describe('Auth tests e2e', () => {
  describe('When create a user', () => {
    // Arrange
    const user = {
      username: 'johndoe',
      fullname: 'John Doe',
      email: 'johndoe@email.com',
      password: 'password',
    }

    it('should return a object normalized', async () => {
      // Act
      const response = await global.appRequest.post('/auth/signup').send(user)
      // Assert
      expect(response.body).toEqual(
        expect.objectContaining({
          username: 'johndoe',
          fullname: 'John Doe',
          email: 'johndoe@email.com',
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
        username: 'johndoe',
        fullname: 'John Doe',
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

  describe('When authenticating', () => {
    // Arrange
    const user = {
      username: 'johndoe',
      fullname: 'John Doe',
      email: 'johndoe@email.com',
      password: 'password',
    }
    it('should return 200 if login is successful', async () => {
      const userLogin = {
        email: 'johndoe@email.com',
        password: 'password',
      }
      // Act
      await global.appRequest.post('/auth/signup').send(user)
      const response = await global.appRequest.post('/auth/signin').send(userLogin)
      expect(response.status).toEqual(200)
    })

    it('should return 400 if email is wrong', async () => {
      const userLogin = {
        email: 'error@email.com',
        password: 'password',
      }
      // Act
      // await global.appRequest.post('/auth/signup').send(user)
      const response = await global.appRequest.post('/auth/signin').send(userLogin)
      expect(response.status).toEqual(400)
    });

    it('should return 400 if password is wrong', async () => {
      const userLogin = {
        email: 'johndoe@email.com',
        password: 'error',
      }
      // Act
      await global.appRequest.post('/auth/signup').send(user)
      const response = await global.appRequest.post('/auth/signin').send(userLogin)
      expect(response.status).toEqual(400)
    });

    it('should return 422 when there is a validation error', async () => {
      // Arrange
      const user = {
        email: '',
        password: '',
      }
      // Act
      const response = await global.appRequest.post('/auth/signin').send(user)

      // Assert
      expect(response.status).toEqual(422)
      expect(response.body).toEqual({ code: 422, message: 'Validation Failed' })
    })
  })
})
