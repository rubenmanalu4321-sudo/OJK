function success(res, statusCode, data) {
  return res.status(statusCode).json(data);
}

function error(res, statusCode, message) {
  return res.status(statusCode).json({ message });
}

module.exports = { success, error };