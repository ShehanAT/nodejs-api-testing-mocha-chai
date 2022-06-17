import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pkg from 'lodash';
const { omit } = pkg;

import database from '../models/index.js';

dotenv.config();

const secret = process.env.secretKey;

const { User } = database;

const UserController = {

  /**
   * @description - Adds a new user to the database
   *
   * @param  {object} req - request object
   *
   * @param  {object} res - response object
   *
   * @return {Object} - Object containing user detail
   *
   * Route: POST: /users/signup
   */
  create( req, res ) {

    return User.create( req.userInput )
      .then( ( user ) => {
        const currentUser = omit(
          user.dataValues,
          ['password', 'createdAt', 'updatedAt']
        );
        if ( currentUser.id ) {
          currentUser.userId = currentUser.id;
        }
        const token = jwt.sign(
          {
            currentUser,
            exp: Math.floor( Date.now() / 1000 ) + ( 60 * 60 * 24 )
          },
          secret
        );
        return res.status( 201 ).send( {
          message: 'Signed up successfully',
          token
        } );
      } )
      .catch( error => {
        console.log( error, '=======>' )

      } );
  },

  /**
   * @description - Authenticates user login information
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Object containing user details
   *
   * Route: POST: /users/signin
   */
  login( req, res ) {
    if ( !req.body.username || !req.body.password ) {
      return res.status( 401 ).json( {
        message: 'Please provide your username or password to login'
      } );
    }

    const username = req.body.username.toLowerCase();

    return User.findOne( {
      where: {
        username
      }
    } )
      .then( ( user ) => {
        if ( user && bcrypt.compareSync( req.body.password, user.password ) ) {
          const currentUser = omit(
            user.dataValues,
            ['password', 'createdAt', 'updatedAt']
          );
          currentUser.userId = currentUser.id;
          const token = jwt.sign(
            {
              currentUser,
              exp: Math.floor( Date.now() / 1000 ) + ( 60 * 60 * 24 )
            },
            secret
          );
          return res.status( 200 ).send( {
            message: 'Logged In Successfully',
            token
          } );
        }
        return res.status( 401 ).json( {
          message: 'Invalid Credentials.'
        } );
      } )
      .catch( error => {
        console.log( error, '=======>' )

      } );
  },

  /**
 * Validates user data
 *
 * @param {Object} res - response
 *
 * @param {Object} userData - Object containing user information
 *
 * @returns {Object} - Response object
 */
  checkValidUser( res, userData ) {
    if ( Number( userData.userId ) !== Number( userData.newId ) ) {
      return res.status( 400 ).send( {
        message: 'Invalid user id supplied'
      } );
    }
  },

  /**
   *
   * @description - Edit profile controller
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
   *
   * @returns {Object} - Object containing status code and success message
   */
  editProfile( req, res ) {
    const { userId } = req.decoded.currentUser;
    const userDetails = { userId, newId: req.params.userId };
    UserController.checkValidUser( res, userDetails );

    return User.update( req.newUserData, {
      where: {
        id: userId
      },
      returning: true,
      plain: true
    } )
      .then( ( result ) => {
        const currentUser = omit(
          result[1].dataValues,
          ['password', 'createdAt', 'updatedAt']
        );
        currentUser.userId = currentUser.id;
        const token = jwt.sign(
          {
            currentUser,
            exp: Math.floor( Date.now() / 1000 ) + ( 60 * 60 * 24 )
          },
          secret
        );
        res.status( 200 ).send( {
          message: 'Profile updated successfully',
          token
        } );
      } )
      .catch( ( error ) => {
        return res.status( 500 ).send( error );
      } );
  }
};

export default UserController;
