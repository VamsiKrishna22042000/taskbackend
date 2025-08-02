import errorConstants from "../constants/errorConstants.js";

const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  switch (statusCode) {
    case errorConstants.VALIDATION_ERROR:
      res.status(statusCode).json({
        message: err.message || "Validation Error: Bad Request",
        status: statusCode,
        stackTrace:
          process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
      break;
    case errorConstants.UN_AUTHORIZED:
      res.status(statusCode).json({
        message: err.message || "Unauthorized",
        status: statusCode,
        stackTrace:
          process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
      break;
    case errorConstants.REQUEST_FORBIDDEN:
      res.status(statusCode).json({
        message: err.message || "Forbidden",
        status: statusCode,
        stackTrace:
          process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
      break;
    case errorConstants.NOT_FOUND:
      res.status(statusCode).json({
        message: err.message || "Not Found",
        status: statusCode,
        stackTrace:
          process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
      break;
    case errorConstants.INTERNAL_SERVER_ERROR:
      res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        status: statusCode,
        stackTrace:
          process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
      break;
    default:
      res.status(statusCode).json({
        message: err.message || "An unexpected error occurred",
        status: statusCode,
        stackTrace:
          process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
      break;
  }
};

export default errorHandler;
