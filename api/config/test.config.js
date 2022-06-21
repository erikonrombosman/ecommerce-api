/**
 * This module setup de testing environment.
 * Is executed before test.
 * More information at: https://jestjs.io/docs/en/configuration#setupfilesafterenv-array
 */
import chai from 'chai';
import chaiThings from 'chai-things';
import chaiAsPromise from 'chai-as-promised';
import chaiDatetime from 'chai-datetime';
import sinonChai from 'sinon-chai';
import mongoose from 'mongoose';

// Load Chai assertions
global.expect = chai.expect;
global.assert = chai.assert;

// Config chai
chai.should();
chai.use(chaiThings);
chai.use(chaiAsPromise);
chai.use(chaiDatetime);
chai.use(sinonChai);

// Test helpers

/**
 * Open a Mongo DB connection with Mongoose
 * @return {Promise} - Mongoose connect promise
 */
function openMongoDB() {
  return mongoose.connect(process.env.MONGODB_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME }
  );
}

/**
* Drop all documents from a collection
* @param {MongoCollection} Collection - Collection to be dropped
* @return {Promise} - Promise with the operation
*/
function dropCollection(Collection) {
  return Collection.deleteMany({});
}

export {
  dropCollection,
  openMongoDB,
}
