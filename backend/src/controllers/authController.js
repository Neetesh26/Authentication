import authService from '../services/authService.js';

export async function register(req, res, next) {
  try {
    const { email, password, name } = req.body;
    const user = await authService.register({ email, password, name });
    res.status(201).json({ message: 'User registered successfully', user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.json({ message: 'Login successful', token: result.token, user: result.user });
  } catch (error) {
    next(error);
  }
}
