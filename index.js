//Loading Environmental Variables
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//Express Initialization
const express = require("express");
const app = express();

//MongoDB connection with mongoose
const mongoose = require("mongoose");
const connectDB = require("./config/db");
connectDB();

//Sessions
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

//Passport
const passport = require("passport");
require("./config/passport")(passport);

//Express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Setting view engine
app.set("view engine", "ejs");

//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/getAlbums", require("./routes/getAlbums"));
app.use("/getArtists", require("./routes/getArtists"));
app.use("/createPlaylist", require("./routes/createPlaylist"));
app.listen(PORT, () => console.log(`server is running on PORT: ${PORT}`));
