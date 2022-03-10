const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const layout = require("./views/layout");
const wikiRouter = require("./routes/wiki");
const usersRouter = require("./routes/users");
const { db, Page, User } = require("./models");

const app = express();
app.use(morgan("dev"));

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
// express.urlencoded({ extended: false });

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res) => {
  res.redirect("/wiki");
});

app.use("/wiki", wikiRouter);

const init = async () => {
  await db.sync();
  // await db.sync({ force: true });
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
