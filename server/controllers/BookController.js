import database from '../models/index.js';
import UserController from './UserController.js';
import fs from 'fs';
import bookSeeder from '../seeders/bookSeeder.js';


const { listOfBookCategories } = bookSeeder;
const { checkValidUser } = UserController;

const {
  RentedBook, Book, Category, Notification
} = database;

const {
  listOfBooks,
  rentedBooks
} = bookSeeder;


const BookController = {
  /**
   * @description - Admin add new book
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Object containing status code and success message
   *
   * Route: POST: /books
   *
   */
  create(req, res) {

    const newBook = {
      bookId: req.body['0[bookId]'],
      name: req.body['0[name]'],
      isbn: req.body['0[isbn]'],
      description: req.body['0[description]'],
      productionYear: req.body['0[productionYear]'],
      categoryId: req.body['0[categoryId]'],
      author: req.body['0[author]'],
    }
    try{
      fs.writeFile('./savedBook.txt', JSON.stringify(newBook), err => {
        if(err){
          console.error(err);
          return 
        }
      });
    }catch(err){
      console.log(err);
    }
 

    return res.status(201).send({
      message: 'Book saved successfully',
      book: newBook
    });
    // return Book.create(req.userInput)
    //   .then((book) => {
    //     return res.status(201).send({
    //       message: 'Book uploaded successfully',
    //       book
    //     });
    //   })
    //   .catch(error => res.status(500).send(error));
  },

  /**
 * @description - Notifies the admin on any transaction
 *
 * @param {number} userId - User ID
 *
 * @param {String} username - Username
 *
 * @param {String} bookTitle - book title
 *
 * @param {String} type - type of notification
 *
 * @return { Promise } - Returns a Promise
 */
  createNotification(userId, username, bookTitle, type) {
    return Notification.create({
      userId,
      message: `${username} ${type} ${bookTitle}`
    });
  },

  /**
   * @description - User rent book
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Success message
   *
   * ROUTE: POST: /users/:userId/books
   */
  rentBook(req, res) {
    const userId = req.body['1[userId]'];
    const username = req.body['1[username]'];
    // const { userId, id, username } = req.decoded.currentUser;

    const userData = {
      userId,
      newId: req.body['1[userId]']
    };

    checkValidUser(res, userData);

    // const currentDate = new Date();
    // const after20days = currentDate.setDate(currentDate.getDate() + 20);

    var newlyRentedBook = {
      bookId: req.body['0[bookId]'],
      userId: req.body['1[userId]'],
      returned: false,
    };

    rentedBooks.push(newlyRentedBook);

    res.status(200).send({
      message: 'Book rented by user successfully',
      rentedBook: newlyRentedBook,
    });
  },

  /**
   * @description - Retrieves all recent notifications from the database
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
   *
   * @return {Array} - Lists of notifications
   */
  getNotification(req, res) {
    const limit = 10,
      offset = 0;
    Notification.findAll({
      order: [['createdAt', 'DESC']],
      limit,
      offset
    })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  /**
   * @description - displays all books
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Book details
   *
   *  Route: GET: /api/books
   */
  getBooks(req, res) {
    // const pageNum = Number(req.query.page);
    // let offset = 0;
    // let page;
    // const limit = 8;
    // if (pageNum === 0) {
    //   offset = 0;
    // } else if (pageNum > 0) {
    //   page = pageNum;
    //   offset = (page - 1) * limit;
    // } else {
    //   offset = 0;
    // }

    return res.status(200).send({
      
      message: listOfBooks
    });

    // return Book.findAndCountAll({
    //   order: [['title', 'ASC']],
    //   limit,
    //   offset
    // })
    //   .then((books) => {
    //     if (books.count < 1) {
    //       res.status(404).send({
    //         message: 'There is no book in the database'
    //       });
    //     } else {
    //       res.status(200).send(books);
    //     }
    //   })
    //   .catch(error => res.status(500).send(error));
  },

  /**
   * @description - Adds a new category
   *
   * @param  {object} req - request
   *
   * @param  {Object} res - response
   *
   * @return {Object} - return lists of category
   */
  addCategory(req, res) {
    return Category.findOne({
      where: {
        name: req.body.name
      }
    })
      .then((category) => {
        if (category) {
          res.status(409).send({
            message: 'Category with that name already exist'
          });
        } else {
          return Category.create(req.body).then((newCategory) => {
            if (newCategory) {
              return res.status(201).send({
                message: 'Category added successfully',
                newCategory
              });
            }
          });
        }
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
  /**
   * @description - Dislay users rented books
   *
   * @param  {object} req - request
   *
   * @param  {Object} res - response
   *
   * @return {Object} - Status code and book data
   *
   * Route: GET: //api/users/:UserId/books?returned=false
   */
  rentedBooks(req, res) {
    const userId = req.params.userId;
    const userData = {
      userId: userId,
      newId: req.params.userId
    };

    checkValidUser(res, userData);
    let rentedBooksArr = [];
    for(var i = 0 ; i < rentedBooks.length ; i++){
      if(rentedBooks[i].userId === +userId){
        rentedBooksArr.push(rentedBooks[i]);
      }
    }
    res.status(200).send({
      message: rentedBooksArr
    })
    // return RentedBook.findAll({
    //   where: {
    //     returned: req.query.returned,
    //     userId
    //   }
    // })
    //   .then((books) => {
    //     if (books.length < 1) {
    //       res.status(200).send({
    //         message: 'No rented unreturned books'
    //       });
    //     } else {
    //       res.status(200).send(books);
    //     }
    //   })
    //   .catch(error => res.status(500).send(error));
  },

  /**
   * @description - Admin modify book details
   *
   * @param  {object} req - request
   *
   * @param  {object}  res - resonse
   *
   * @return {Object} - Newly modified book
   */
  modifyBook(req, res) {
    return Book.update(req.body, {
      where: {
        id: req.params.bookId
      },
      returning: true,
      plain: true
    })
      .then((result) => {
        res.status(200).send({
          book: result[1].dataValues,
          message: 'Book updated successfully!'
        });
      })
      .catch(error => res.status(500).send(error));
  },
  /**
   * @description - Admin delete a book
   *
   * @param  {Object} req - request
   *
   * @param  {Object} res - reponse
   *
   * @returns {Object} - returns success message
   *
   * Route: DELETE: /books/delete/:bookId
   *
   */
  deleteBook(req, res) {
    return Book.destroy({
      where: {
        id: req.params.bookId
      }
    })
      .then(() => {
        res.status(200).send({
          message: 'Book deleted successfully!',
          id: Number(req.params.bookId)
        });
      })
      .catch(error => res.status(500).send(error));
  },

  /**
   * @description - Get rented books by a specific user
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @returns {Object} - return lists of rented book by a user
   *
   * Route: GET: /books/logs/:userId
   */
  rentedBookByUser(req, res) {
    const { userId } = req.decoded.currentUser;
    const userData = {
      userId,
      newId: req.body.userId || req.params.userId
    };

    checkValidUser(res, userData);
    return RentedBook.findAll({
      where: {
        userId
      }
    })
      .then((books) => {
        if (books.length < 1) {
          res.status(200).send({
            message: 'No rented books by this user'
          });
        } else {
          res.status(200).send(books);
        }
      })
      .catch(error => res.status(500).send({ message: error }));
  },

  /**
   * @description - User return rented book
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - return list of rented books
   *
   * Route: PUT: /users/:userId/books
   *
   */
  returnBook(req, res) {
    const { userId, username } = req.decoded.currentUser;
    const userData = {
      userId,
      newId: req.body.userId || req.params.userId
    };

    checkValidUser(res, userData);

    return RentedBook.update(
      {
        returnDate: Date.now(),
        returned: true
      },
      {
        where: {
          bookId: req.body.bookId
        }
      }
    )
      .then(() =>
        Book.findById(req.body.bookId).then((book) => {
          Book.update(
            {
              total: book.total + 1
            },
            {
              where: {
                id: req.body.bookId
              }
            }
          ).then(() => {
            BookController.createNotification(
              userId,
              username, book.title, 'return'
            );
            res.status(201).send({
              message: 'Book returned successfully',
              book
            });
          });
        }))
      .catch(error => res.status(500).send(error));
  },

  /**
   * @description - Gets the list of category from database
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Return category from database
   *
   * Route: PUT: /books/category
   *
   */
  getCategory(req, res) {
    if(listOfBookCategories.categories.length > 0){
      res.status(200).send({
        categories: listOfBookCategories.categories
      });
    }else{
      res.status(500).send(err);
    }
  },

  /**
   *
   * @description - Book search controller
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
   *
   * @returns {Object} - Returns search result
   */
  search(req, res) {
    const limit = 8;
    const offset = 0;
    return Book.findAndCountAll({
      where: {
        $or: [
          {
            title: {
              $iLike: `%${req.body.search}%`
            }
          }
        ]
      },
      order: [['title', 'ASC']],
      limit,
      offset
    })
      .then((book) => {
        res.status(200).send(book);
      })
      .catch(error => res.status(500).send(error));
  }
};

export default BookController;
