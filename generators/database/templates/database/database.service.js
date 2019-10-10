const DynamoDb = require('aws-sdk/clients/dynamodb');
const AWS = require('aws-sdk');

const { DatabaseError } = require('../errors/database.error');

let instance;

class DatabaseService {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;

    AWS.config.update({ region: '<%= awsRegion %>' });
    this.dynamoDb = new DynamoDb({ apiVersion: '2012-08-10' });
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

  putItem(tableName, item) {
    const params = {
      TableName: tableName,
      Item: item,
    };

    this.dynamoDb.putItem(params, err => {
      if (err) {
        throw new DatabaseError(err);
      }
    });
  }
}

module.exports = { DatabaseService };
