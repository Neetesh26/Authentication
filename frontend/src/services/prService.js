// Backend does not currently expose a PR approval endpoint, so this function returns a local success stub.
export async function approvePR(prId) {
  return Promise.resolve({ pr: { id: prId, status: 'merged' } });
}
