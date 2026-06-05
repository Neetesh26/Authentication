import PR from '../models/prModel.js';

async function getUserPRs(userId) {
  return PR.find({ user: userId }).sort({ updatedAt: -1 });
}

async function approvePR(userId, prId) {
  const pr = await PR.findOne({ user: userId, _id: prId });
  if (!pr) {
    const error = new Error('PR not found');
    error.statusCode = 404;
    throw error;
  }

  pr.status = 'merged';
  await pr.save();
  return pr;
}

export default {
  getUserPRs,
  approvePR,
};
