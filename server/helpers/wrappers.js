const badRequestError = (message) => {
  return { status: 400, message };
};

const internalServerError = (message) => {
  return { status: 400, message };
};

const notFoundError = (message) => {
  return { status: 404, message };
};

const unauthorizedError = (message) => {
  return { status: 403, message };
};

module.exports = {
  badRequestError,
  internalServerError,
  notFoundError,
  unauthorizedError,
};
