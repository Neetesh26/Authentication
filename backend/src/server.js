import app from './app.js';
import connectDB from './config/db.js';
import config from './config/config.js';

const PORT = config.port || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Authentication backend running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection failed:', error);
  process.exit(1);
});
