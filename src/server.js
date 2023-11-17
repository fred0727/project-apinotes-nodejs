require('dotenv').config();

const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/initModel');

const PORT = process.env.PORT || 3000;

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

initModel();

db.sync({ force: false })
  .then(() => console.log('Database syncronized'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is up un port ${PORT}`);
});
