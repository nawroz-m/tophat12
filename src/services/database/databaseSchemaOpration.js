function mongooseMiddleware(schema, modelName) {
  if (modelName === "Users") {
    schema.set("toObject", { getters: true });
    schema.set("toJSON", { getters: true });
  }

  return schema;
}

module.exports.mongooseMiddleware = mongooseMiddleware;
