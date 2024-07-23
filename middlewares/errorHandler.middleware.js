export const errorHandler = (error, req, res, next) => {
  let customError = {
    statusCode: error.statusCode || 500,
    message: error.message || "Something went wrong try again later.",
  };

  if (error.name === "ValidationError") {
    customError.statusCode = 400;
    customError.message = Object.values(error.errors)
      .map((item) => item.message)
      .join(",");
  }

  // 11000 is an error code for duplicate email
  if (error.code && error.code === 11000) {
    customError.statusCode = 400;
    customError.message = `${Object.keys(error.keyValues)} already exists.`;
  }

  if (error.name === "CastError") {
    customError.statusCode = 404;
    customError.message = `No item found with id: ${error.value}`;
  }

  return res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
  });
};
