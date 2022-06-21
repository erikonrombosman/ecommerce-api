/**
 * This module test Product model functions
 */
/* global afterAll */

import mongoose from 'mongoose';
import factory from 'autofixture';
import { dropCollection, openMongoDB } from '../../config/test.config';

// Load models
import Product from './product.model';
import ProductFixture from './product.fixture';

// Load fixtures
ProductFixture.load(factory);

describe('Product Model', () => {
  beforeAll(() => {
    return openMongoDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  beforeEach(() => {
    return dropCollection(Product);
  });

  describe('create', () => {
    let data;

    beforeEach(() => {
      data = factory.create('Product');
    });

    it('should start test without data', () => {
      return Product.find({}).should.eventually.have.length(0);
    });

    it('should create a Product successfully', async () => {
      return Product.create(data).should.eventually.be.an('object');
    });

    it('should fail create a Product if "name" is not provided', () => {
      Reflect.deleteProperty(data, 'name');
      return Product.create(data).should.be.rejected;
    });

    it('should fail create a Product if "sku" is not provided', () => {
      Reflect.deleteProperty(data, 'sku');
      return Product.create(data).should.be.rejected;
    });

    it('should fail create a Product if "normalPrice" is not provided', () => {
      Reflect.deleteProperty(data, 'normalPrice');
      return Product.create(data).should.be.rejected;
    });
  });
});
