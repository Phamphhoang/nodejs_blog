const app = require('./index');
const connectDB = require('./config/db');

const port = 3000;

connectDB();

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
