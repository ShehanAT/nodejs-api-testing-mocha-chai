const bookSeeder = {
  listOfBookCategories: {
    categories: [
      'Fantasy',
      'Sci-Fi',
      'Mystery',
      'Thriller',
      'Romance',
      'Western',
      'Dystopian',
      'Contemporary'
    ]
  },
  addBook: {
    bookId: 4,
    name: "Seeking Wisdom: From Darwin to Munger",
    isbn: '123-999-5555',
    description: "A book on how to improve your thinking",
    productionYear: 2007,
    categoryId: 1,
    author: 'Marcel Proust',
    total: 25
  },
  rentedBooks: [ 
    {
      bookId: 1,
      userId: 3,
      returned: false,
    },
    {
      bookId: 2,
      userId: 3,
      returned: false,
    },
    {
      bookId: 3,
      userId: 3,
      returned: false,
    }
  ],
  listOfBooks: [
    {
      bookId: 1,
      title: 'In Search of Lost Time',
      isbn: '123-456-5858',
      productionYear: 2015,
      categoryId: 1,
      author: 'Marcel Proust',
      description: "Swann's Way, the first part of A la recherche de temps perdu, Marcel Proust's seven-part cycle, was published in 1913.",
      cover: 'albert-think.jpg',
      total: 20
    },
    {
      bookId: 2,
      title: 'Ulysses',
      isbn: '123-456-5858',
      productionYear: 2019,
      categoryId: 1,
      author: 'James Joyce',
      description: 'Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904.',
      cover: 'albert-think.jpg',
      total: 20
    },
    {
      bookId: 3,
      title: 'Don Quixote',
      isbn: '123-456-5858',
      productionYear: 2010,
      categoryId: 1,
      author: 'Miguel de Cervantes',
      description: 'Alonso Quixano, a retired country gentleman in his fifties, lives in an unnamed section of La Mancha with his niece and a housekeeper. ',
      cover: 'albert-think.jpg',
      total: 20
    }
  ],
  signUp: {
    fullName: 'Zeno of Citium',
    username: 'testtest',
    password: 'helloworld',
    email: 'test@gmail.com'
  },
  adminSignup: {
    fullName: 'Zeno of Citium',
    username: 'hellobooks',
    password: 'helloworld',
    email: 'hellot@gmail.com'
  },
  validBook: {
    title: 'Think rich to grow rich',
    isbn: '123-456-5858',
    productionYear: 2018,
    categoryId: 1,
    author: 'Albert Einstein',
    description: 'The book is based on education',
    cover: 'albert-think.jpg',
    total: 20
  },

  noBookTitle: {
    isbn: '123-456-5858',
    total: 20,
    productionYear: 2018,
    author: 'Albert Einstein',
    categoryId: 1,
    description: 'The book is based on education',
    cover: 'albert-think.jpg'
  },

  noIsbn: {
    title: 'Think rich to grow rich',
    productionYear: 2018,
    total: 20,
    categoryId: 1,
    author: 'Albert Einstein',
    description: 'The book is based on education',
    cover: 'albert-think.jpg'
  },

  noProductionYear: {
    title: 'Think rich to grow rich',
    author: 'Albert Einstein',
    total: 20,
    isbn: '123-565-h474',
    categoryId: 1,
    description: 'The book is based on education',
    cover: 'albert-think.jpg'
  },

  noCover: {
    title: 'Think rich to grow rich',
    isbn: '123-fgg-383v',
    total: 20,
    productionYear: 2018,
    categoryId: 1,
    author: 'Albert Einstein',
    description: 'The book is based on education'
  },

  noAuthor: {
    title: 'Think rich to grow rich',
    productionYear: 2018,
    cover: 'think-man.png',
    total: 20,
    categoryId: 1,
    isbn: '123-838h-hdh',
    description: 'The book is based on education'
  },

  noCategoryId: {
    title: 'Think rich to grow rich',
    productionYear: 2018,
    cover: 'think-man.png',
    author: 'Albert james',
    isbn: '123-838h-hdh',
    description: 'The book is based on education',
    total: 20
  }

};
export default bookSeeder;
