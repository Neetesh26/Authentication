export function notFound(req, res, next) {
  res.status(404);
  next(new Error('Route not found'));
}

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode ?? (res.statusCode === 200 ? 500 : res.statusCode);
  res.status(statusCode).json({
    error: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
}
