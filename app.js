const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app)
const PORT = process.env.PORT || 8081;
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

//passport config
require("./config/passport")(passport);

//DB Config
const db = require("./config/keys").MongoURI;

//DB Connecction
mongoose.connect(db, { useNewUrlParser:true, useUnifiedTopology:true })
.then(() => console.log("DB Connected.."))
.catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//BodyParser
app.use(express.urlencoded({ extended: true}));

//Express Session
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true,
}));

//passport middlewre
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Glabal variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
 });

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

server.listen(PORT, () => {
    console.log(`Server listening to ${PORT}`);
});
