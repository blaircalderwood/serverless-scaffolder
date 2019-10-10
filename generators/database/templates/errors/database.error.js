exports.DatabaseError = class extends Error {
  constructor(errorMessage) {
    super();
    const message = errorMessage.errorMessage || errorMessage.message;

    this.errorMessage = `DynamoDB error ${message}`;
  }
};
