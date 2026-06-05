import dashboardService from '../services/dashboardService.js';
import User from '../models/userModel.js';

export async function getDashboard(req, res, next) {
  try {
    const dashboard = await dashboardService.getDashboard(req.user.id);
    const user = await User.findById(req.user.id).select('name email githubUsername githubEmail');
    res.json({ user, ...dashboard });
  } catch (error) {
    next(error);
  }
}
