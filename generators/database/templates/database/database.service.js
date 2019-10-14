const AWS = require('aws-sdk');

const { DatabaseError } = require('../../errors/database.error');

let instance;

class _DatabaseService {
  constructor() {
    AWS.config.update({ region: '<%= awsRegion %>' });
    this.dynamoDb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
  }

  async getItem(tableName, key) {
    const params = {
      TableName: tableName,
      Key: key,
    };

    try {
      const result = await this.dynamoDb.getItem(params).promise();

      return result.Item;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  async putItem(tableName, item) {
    const params = {
      TableName: tableName,
      Item: item,
    };

    try {
      await this.dynamoDb.putItem(params).promise();
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

class DatabaseService {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = new _DatabaseService();

    return instance;
  }
}

module.exports = { DatabaseService, _DatabaseService };
