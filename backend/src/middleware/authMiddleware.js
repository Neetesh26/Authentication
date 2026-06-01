import tokenService from '../services/tokenService.js';

export async function protect(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('Authorization token missing');
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = tokenService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    const authError = new Error('Invalid or expired token');
    authError.statusCode = 401;
    next(authError);
  }
}
