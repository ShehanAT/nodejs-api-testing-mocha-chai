const userSeeder = {
  adminUser: {
    userId: 1, 
    fullName: 'Zeno of Citium',
    username: 'zeno123',
    password: '123456',
    email: 'zeno123@gmail.com',
    isAdmin: true,
    passwordConfirm: '123456'
  },
  nonAdminUser: {
    userId: 4, 
    fullName: 'Epitetus',
    username: 'epitetus123',
    password: 'abcdef',
    email: 'epitetus@gmail.com',
    isAdmin: false,
    passwordConfirm: 'abcdef'
  },
  signUp: {
    fullName: 'Zeno of Citium',
    username: 'zeno123',
    password: '123456',
    email: 'zeno123@gmail.com',
    isAdmin: true,
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
    fullName: 'Gauis Musonius Rufus',
    username: 'rufus',
    password: '123456',
    email: 'rufus123@gmail.com',
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
    username: 'cato123',
    password: '123456',
    email: 'cato123@gmail.com',
    passwordConfirm: '123456'
  },
  noEmail: {
    fullName: 'Killian Chukwu',
    username: 'Chukwu123',
    password: '123456',
    passwordConfirm: '123456'
  },
  validRegisterDetails: { 
    fullName: 'Cleanthes Stoic',
    username: 'testuser1',
    password: 'password1',
    email: 'cleanthes123@gmail.com',
    passwordConfirm: 'password1'
  },
  invalidUsernameMin5: {
    fullName: 'Cleanthes Stoic',
    username: 'test',
    password: 'password2',
    email: 'cleanthes456@gmail.com',
    passwordConfirm: 'password2'
  }
};

export default userSeeder;
