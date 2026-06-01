import fs from 'fs/promises';

async function readJson(filePath) {
  try {
    const fileData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileData || '[]');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export default {
  readJson,
  writeJson,
};
