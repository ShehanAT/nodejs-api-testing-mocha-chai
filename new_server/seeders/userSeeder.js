const userSeeder = {
  signUp: {
    fullName: 'Killian Chukwu',
    username: 'Chukwu123',
    password: '123456',
    email: 'Chukwu123@gmail.com',
    isAdmin: 1,
    passwordConfirm: '123456'
  },

  signUp2: {
    fullName: 'Fortune Caius',
    username: 'Caius123',
    password: '123456',
    email: 'Caius123@gmail.com',
    passwordConfirm: 'helloworld'
  },

  login: {
    username: 'Maverick',
    password: 'Sasho'
  },

  invalidLoginDetails: {
    username: 'Gotthold',
    password: 'hello'
  },

  missingPassword: {
    username: 'Gotthold',
  },

  existingUsername: {
    fullName: 'Killian Chukwu',
    username: 'Chukwu123',
    password: '123456',
    email: 'Chukwu123@gmail.com',
    passwordConfirm: '123456'
  },

  existingEmail: {
    fullName: 'Killian Chukwu',
    username: 'Chukwu123',
    password: '123456',
    email: 'Chukwu123@gmail.com',
    passwordConfirm: '123456'
  },
  noFullName: {
    username: 'Chukwu123',
    password: '123456',
    email: 'Chukwu123@gmail.com',
    passwordConfirm: '123456'
  },
  noEmail: {
    fullName: 'Killian Chukwu',
    username: 'Chukwu123',
    password: '123456',
    passwordConfirm: '123456'
  },
  usernameMin5: {
    fullName: 'Killian Chukwu',
    username: 'testuser1',
    password: 'password1',
    email: 'Chukwu123@gmail.com',
    passwordConfirm: 'password1'
  }
};

export default userSeeder;
