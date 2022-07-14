const { Schema } = require("mongoose");
const { plugin } = require("mongoose-auto-increment");
const { mongooseMiddleware } = require("./databaseSchemaOpration");
const { db } = require("../../config/database");
const timestamps = { createdAt: "created_at", updatedAt: "updated_at" };

class DatabaseOperation {
  //Database model
  createModel(modelName, schema) {
    try {
      let newSchema = new Schema(schema, { timestamps });
      // use hooks
      // addHooks(newSchema,modelName)
      newSchema = mongooseMiddleware(newSchema, modelName);
      newSchema.plugin(plugin, {
        model: modelName,
        field: "_id",
        startAt: 1,
        incrementBy: 1,
      });

      return db.model(modelName, newSchema);
    } catch (e) {
      console.log(e);
    }
  }

  // create new document
  async create(modelClass, obj) {
    // async create(model) {
    const model = new modelClass(obj);
    return new Promise((resolve, reject) => {
      try {
        const data = Promise.resolve(model.save());
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  //Get Document
  async get(modelClass, obj, returnField, options) {
    return new Promise((resolve, reject) => {
      try {
        const data = Promise.resolve(modelClass.find(obj, returnField));
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  // async getALL(modelClass) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const data = Promise.resolve(modelClass.find({}));
  //       resolve(data);
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }

  // async update(modelClass, obj, returnField, option) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const data = Promise.resolve(modelClass.updateOne(obj, returnField));
  //       resolve(data);
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }
}

module.exports.DBOperation = DatabaseOperation;
