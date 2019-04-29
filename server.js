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
const topicsRoutes  = require("./routes/topics");
const ratesRoutes       = require("./routes/ratings");
const commentsRoutes = require("./routes/comments");

// const viewRoutes = require("./routes/views");

//cleaning function
// function getHeaderTemplateVars(req){
//   let user_id = JSON.stringify(req.session["user_id"]);
// 	return {
// 		user_id: req.session["user_id"]
// 	}
// }

//cookie session for midterm project
app.use(cookieSession({
  name: 'session',
  keys: ["user_id"]
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
app.use("/api/resources", resourcesRoutes(knex));
app.use("/api/topics", topicsRoutes(knex));

//finish the rest


// Home page
app.get("/", (req, res) => {
    // console.log("req session user id", req.session);

  if (req.session.user_id) {
  knex
    .select('*')
    .from('users')
    .where('id', req.session.user_id)
    .then((userInfo) => {
      // console.log("user info contains", userInfo[0].user_name);
      let templateVars = {user_name: userInfo[0].user_name};

      return res.render('index', templateVars);
    });

  } else {
      // console.log("im trying to laod the main page");
      let templateVars = {user_name: false};
      return res.render('index',templateVars);
  }
});



app.get("/users/:user_id", (req,res) => {
      knex.select('*').from('users')
    .where('id', req.session.user_id)
    .then(function(results) {

      if (results[0] === undefined) {
        knex.select('*')
          .from('users')
          .where('id', req.session.user_id)
          .then(function(results) {
            const new_user = results[0];
            console.log("results for new user", new_user);
            const templateVars = {
              first_name: new_user.first_name,
              last_name: new_user.last_name,
              email: new_user.email,
              id: req.session.user_id,
              user_name: new_user.user_name,
            }
            return res.render('account_page', templateVars);
          });
      } else {
        const old_user = results[0];
        const templateVars = {
          first_name: old_user.first_name,
          last_name: old_user.last_name,
          email: old_user.email,
          id: req.session.user_id,
          user_name: old_user.user_name,
          title: old_user.title
        }
        return res.render('account_page', templateVars);
      }
    });
    });

// GET edit user profile route
app.get("/users/:user_id/edit_profile", (req,res) => {
      knex.select('*').from('users')
    .where('id', req.session.user_id)
    .then(function(results) {

        knex.select('*')
          .from('users')
          .where('id', req.session.user_id)
          .then(function(results) {
            const user = results[0];
            console.log(user);
            const templateVars = {
              first_name: user.first_name,
              last_name: user.last_name,
              user_name: user.user_name,
              email: user.email,
              id: req.session.user_id,
              password: user.password
            }
            return res.render('edit_profile', templateVars);
          });

    });
    });

  // LOGOUT ROUTE
  app.post("/logout", (req, res) => {
    console.log("logging out!");
  req.session = null;
  return res.redirect("/");
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
