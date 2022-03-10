const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout');
const { db, Page, User } = require('./models');

const app = express();
app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));
express.urlencoded({ extended: true });

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.get('/', (req, res) => {
  res.send(layout(''));
});

const init = async () => {
  await db.sync();
  // await db.sync({ force: true });
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
