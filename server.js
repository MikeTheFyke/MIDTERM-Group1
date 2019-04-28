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

//finish the rest


// Home page
app.get("/", (req, res) => {
    console.log("req session user id", req.session.user_id);

  if (req.session.user_id) {
  knex
    .select('*')
    .from('users')
    .where('id', req.session.user_id)
    .then((userInfo) => {
      console.log("user info contains", userInfo[0].user_name);
      let templateVars = {user_name: userInfo[0].user_name};

      return res.render('index', templateVars);
    });

  } else {
      let templateVars = {user_name: false};
      return res.render('login',templateVars);
  }
});
// LOGIN PAGE GET REQUEST
  // app.get("/login", (req,res )=> {
  //   if (req.session.user_id) {
  // knex
  //   .select('*')
  //   .from('users')
  //   .where('id', req.session.user_id)
  //   .then((userInfo) => {
  //     console.log("user info contains", userInfo[0].user_name);
  //     let templateVars = {user_name: userInfo[0].user_name};
  //     //will redirect if logged in to the user's wall,therefore need to create
  //     // user's wall get request to finish the route
  //     return res.redirect('index', templateVars);
  //   });
  // // const loggedUser = req.session.user_id;
  // // if(loggedUser) {
  // //   res.redirect("/main");
  // } else {
  //     let templateVars = {user_name: false};

  //       res.render("login",templateVars);
  //     };

  // });

  // GET REGISTER PAGE
  //dont need no get register route since we got the header to register//

//   app.get("/register", (req,res )=> {
//   const loggedUser = req.session.user_id;
//   if(loggedUser) {
// //when user registers redirect them to the user's wall//
//     res.redirect("/main");
//   } else {
//       let templateVars = {user_name: false};
//       res.render("register",templateVars);
//       };

//   });


app.get("/users/:user_id", (req,res) => {
    // console.log("user's wall!!!!!!");
      knex.select('*').from('users')
    // .join('topics',{'users.id' : 'topic.user_id'})
    .where('id', req.session.user_id)
    .then(function(results) {
      console.log("userpage result",results);

      if (results[0] === undefined) {
        knex.select('*')
          .from('users')
          .where('id', req.session.user_id)
          .then(function(results) {
            const new_user = results[0];
            const template = {
              first_name: new_user.first_name,
              last_name: new_user.last_name,
              email: new_user.email,
              id: req.session.user_id,
              user_name: new_user.user_name,
            }
            return res.render('my_wall', template);
          });
      } else {
        const old_user = results[0];
        const templateVars = {
          // full_name: walls.full_nam••••e
          first_name: old_user.first_name,
          last_name: old_user.last_name,
          email: old_user.email,
          id: req.session.userid,
          user_name: old_user.user_name,
          title: old_user.title
        }
        res.render('account_page', templateVars);
      }
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
