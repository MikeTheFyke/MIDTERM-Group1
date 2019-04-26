"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const cookieSession = require('cookie-session');
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each database tables
const usersRoutes = require("./routes/users");
const resourcesRoutes   = require("./routes/resources");
const categoriesRoutes  = require("./routes/topics");
const ratesRoutes       = require("./routes/ratings");
const commentsRoutes = require("./routes/comments");

// const viewRoutes = require("./routes/views");

//cleaning function
function getHeaderTemplateVars(req){
  let user_id = JSON.stringify(req.session["user_id"]);
	return {
		user_id: req.session["user_id"]
	}
}

//cookie session for midterm project
app.use(cookieSession({
  name: 'session',
  keys: ["token_session_id"]
}))

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
// app.use("/", viewRoutes());
//finish the rest

// main page
app.get("/", (req, res) => {
  res.render("index");
});

//regiser page
// app.get("/register", (req,res) => {
//   let templateVars = {...getHeaderTemplateVars(req),
//                          user: req.session.token_session_id}
//   res.render("register", templateVars);
// })

//login page
// app.get("/login", (req,res) => {
//   let templateVars = {...getHeaderTemplateVars(req)};
//   // , user: req.session.user_id
//   res.render("login", templateVars);
// })


// app.get("/new_topic", (req,res) => {
// 	res.render("new_topic");
// })

// app.get("/new_resource", (req,res) => {
// 	res.render("new_resource");
// })

//logout clear cookies
// app.post("/logout", (req,res) => {
//   req.session = null;
//   res.redirect("/index");
// });

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
