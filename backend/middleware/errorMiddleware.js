const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404); // 404 is not found
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // Sometimes we get a 200 status code even though there is an error
  // This is a fallback status code
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // this is sepcific to mongodb and mongoose errors
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode(404);
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
