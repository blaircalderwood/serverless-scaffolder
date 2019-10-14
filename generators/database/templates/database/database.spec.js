const awsMock = require('aws-sdk-mock');

const { DatabaseError } = require('../../errors/database.error');

const { DatabaseService, _DatabaseService } = require('./database.service');

describe('Database service', () => {
  describe('Singleton class', () => {
    it('public outer class is a singleton class', () => {
      const firstClassInstance = new DatabaseService();
      const secondClassInstance = new DatabaseService();

      expect(firstClassInstance).toBe(secondClassInstance);
    });

    it('private inner class is not a singleton class', () => {
      const firstClassInstance = new _DatabaseService();
      const secondClassInstance = new _DatabaseService();

      expect(firstClassInstance).not.toBe(secondClassInstance);
    });
  });

  describe('getItem', () => {
    it('gets an object from a DynamoDB table', async done => {
      const expectedItem = {
        fullName: 'Jackson Juntersmith',
        age: 105,
      };

      const mockResult = {
        Item: expectedItem,
      };

      const mockedPromiseResolve = jest.fn(() => Promise.resolve(mockResult));

      awsMock.mock('DynamoDB', 'getItem', () => mockedPromiseResolve());

      const databaseService = new _DatabaseService();
      const result = await databaseService.getItem('a-table-name', {
        fullName: { S: expectedItem.fullName },
      });

      expect(mockedPromiseResolve).toHaveBeenCalled();
      expect(result).toEqual(expectedItem);

      done();
    });

    it("throws an error when DynamoDB table item can't be accessed", async done => {
      const errorMessage = 'this is an error message';

      const mockedPromiseReject = jest.fn(() =>
        Promise.reject({ errorMessage })
      );

      awsMock.mock('DynamoDB', 'getItem', () => mockedPromiseReject());

      const databaseService = new DatabaseService();

      await expect(
        databaseService.getItem('Jimothy McJackness')
      ).rejects.toThrow(DatabaseError);

      done();
    });
  });

  describe('putItem', () => {
    it('puts an object into a DynamoDB table', async done => {
      const item = {
        fullName: { S: 'Joesemite Japan' },
        age: { N: '65' },
      };

      const mockedPromiseResolve = jest.fn(() => Promise.resolve('hi'));

      awsMock.mock('DynamoDB', 'putItem', () => mockedPromiseResolve());

      const databaseService = new _DatabaseService();

      databaseService.putItem('another-table-name', item);

      expect(mockedPromiseResolve).toHaveBeenCalled();

      done();
    });

    it("throws an error when DynamoDB table can't be accessed", async done => {
      const errorMessage = 'this is a put error message';

      const mockedPromiseReject = jest.fn(() =>
        Promise.reject({ errorMessage })
      );

      awsMock.mock('DynamoDB', 'putItem', () => mockedPromiseReject());

      const databaseService = new _DatabaseService();

      await expect(databaseService.putItem('Jonas McPonus')).rejects.toThrow(
        DatabaseError
      );

      done();
    });
  });
});
