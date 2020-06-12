const express = require("express");
const cors = require("cors");
require("./models");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const routes = require("./routes");

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());

const corsConfig = {
  origin: [`http://localhost:3000`, `http://localhost:3001`],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsConfig));

app.use(
  session({
    store: new MongoStore({ url: "mongodb://localhost:27017/e-commerce" }),
    secret: "testSecretUntilImReadyToDeploy",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 48,
    },
  })
);

app.use("/api/v1/users", routes.users);
app.use("/api/v1/auth", routes.auth);
app.use("/api/v1/products", routes.products);

app.listen(port, () => console.log(`Server is running on port ${port}`));
