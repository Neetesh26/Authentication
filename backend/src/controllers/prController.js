import prService from '../services/prService.js';

export async function approvePR(req, res, next) {
  try {
    const { prId } = req.params;
    const pr = await prService.approvePR(req.user.id, prId);
    res.json({ pr });
  } catch (error) {
    next(error);
  }
}
