export const hendleSave = (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServ erError" && code === 11000 ? 409 : 400;
  next();
};
