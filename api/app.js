var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
const sequelize = require("./models").sequelize;
const auth = require("basic-auth");
var cors = require("cors");
var app = express();

//models
const User = require("./models").User;
const Entry = require("./models").Entry;

//encryption
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

//sync db
(async () => {
  try {
    await sequelize.sync();
  } catch (err) {
    console.error("Man down in Sync Function! ", err);
  }
})();

// db connection tester
(async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection to database successful!");
  } catch (err) {
    console.error("Man down! DB connection problem:", err);
  }
})();

//authentication
const authenticateUser = async (req, res, next) => {
  const credentials = auth(req);
  let message;
  if (credentials) {
    const user = await User.findOne({
      where: { emailAddress: credentials.name },
    });

    if (user) {
      const authenticated = await bcrypt.compare(
        credentials.pass,
        user.password
      );
      if (authenticated) {
        console.log(`Authentication successful.`);
        req.currentUser = user;
      } else {
        message = `Authentication failure.`;
      }
    } else {
      message = `User not found.`;
    }
  } else {
    message = "Auth header not found";
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: "Access Denied" });
  } else {
    next();
  }
};

app.get("/", async (req, res) => {
  try {
    res.send("Welcome to the Tomorrow Land API!");
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/users", authenticateUser, async (req, res) => {
  try {
    let user = await req.currentUser;
    user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
    };
    res.status(200).json({ user });
  } catch (err) {
    console.error("Man down! ", err);
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const body = req.body;
    let hash;

    //encrypt password if provided
    if (
      body.password !== "" &&
      body.password !== null &&
      body.password !== undefined
    ) {
      hash = bcrypt.hashSync(body.password, salt);
    } else {
      hash = null;
    }

    //store encrypted password
    const newUser = {
      firstName: body.firstName,
      lastName: body.lastName,
      emailAddress: body.emailAddress,
      password: hash,
    };

    //add user to database
    await User.create(newUser);
    res.set("Location", "/");
    res.status(201).send();
  } catch (err) {
    console.error("Man down! ", err);
    if (err.name.toLowerCase().includes("sequelize")) {
      //return validation errors
      const errors = err.errors.map((err) => err.message);
      res.status(400).json({ errors });
    }
  }
});

app.get("/api/entry", authenticateUser, async (req, res) => {
  try {
    let UserId = await req.currentUser.id;
    let entry = await Entry.findAll({ where: { UserId } });

    res.status(200).json({ entry });
  } catch (err) {
    console.error("Man down! ", err);
    res.status(400);
  }
});

app.post("/api/entry", authenticateUser, async (req, res) => {
  try {
    let data = req.body;
    const user = req.currentUser;
    let isIncome;
    //set category via binary
    if (data.key[0] === "i") {
      isIncome = 1;
    } else {
      isIncome = 0;
    }
    //add income to database
    data = {
      isIncome,
      key: data.key,
      name: data.name,
      amount: data.amount,
      UserId: user.id,
    };
    await Entry.create(data);
    //response
    res.set("Location", "/");
    res.status(201).send();
  } catch (err) {
    console.error("Man down! ", err);
    if (err.name.toLowerCase().includes("sequelize")) {
      //return validation errors
      const errors = err.errors.map((err) => err.message);
      res.status(400).json({ errors });
    }
  }
});

app.delete("/api/entry", authenticateUser, async (req, res) => {
  try {
    const key = req.body.key;
    await Entry.destroy({ where: { key } });
    res.status(204).send();
  } catch (err) {
    console.error("Man down! ", err);
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
});

//SERVER

// set our port
app.set("port", process.env.PORT || 8080);

// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

module.exports = app;
