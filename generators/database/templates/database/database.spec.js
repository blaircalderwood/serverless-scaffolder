const DynamoDB = require('aws-sdk/clients/dynamodb');

const DatabaseService = require('./database.service');

describe('Database service', () => {
  describe('getItem', () => {
    it('gets an object from a DynamoDB table', async done => {
      const mockItem = {
        fullName: 'Jackson Juntersmith',
        age: 105,
      };

      const mockDynamoDbGet = (DynamoDB.prototype.getItem = jest.fn(
        () => mockItem
      ));

      const databaseService = new DatabaseService();
      const result = databaseService.getItem(mockItem.fullName);

      expect(mockDynamoDbGet).toHaveBeenCalled();
      expect(result).toBe(mockItem);

      done();
    });

    it("throws an error when DynamoDB table item can't be accessed", () => {});
  });

  describe('putItem', () => {
    it('puts an object into a DynamoDB table', () => {});

    it("throws an error when DynamoDB table can't be accessed", () => {});
  });
});
