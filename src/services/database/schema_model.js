const { DBOperation } = require("./database_operation");

class SchemaModel {
  constructor(model) {
    this.model = model;
  }

  async add(data) {
    return new Promise((resolve, reject) => {
      try {
        const addedData = Promise.resolve(
          new DBOperation().create(this.model, data)
        );
        resolve(addedData);
      } catch (err) {
        reject(err);
      }
    });
  }
  async get(filter, returnField, option) {
    return new Promise((resolve, reject) => {
      try {
        const findUser = Promise.resolve(
          new DBOperation().get(this.model, filter, returnField, option)
        );
        resolve(findUser);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = SchemaModel;
