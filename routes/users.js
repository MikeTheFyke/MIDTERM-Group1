"use strict";

const express = require('express');
// const app = express();
const router  = express.Router();
const bcrypt = require("bcrypt");

//helper function
function generateRandomString() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}



module.exports = (knex) => {

 // when user registers
  router.post("/register", (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  knex
    .select("*")
    .from("users")
    .then((results) => {
      for(let i = 0;i < results.length;i++) {
        if (req.body.email === results[i].email) {
          return res.status(400).send("HTTP 400 - BAD REQUEST: E-MAIL ALREADY USED!").end();
        } else if (req.body.user_name === results[i].user_name) {
          return res.status(400).send("HTTP 400 - BAD REQUEST: USERNAME ALREADY USED!").end();
        }
      }
      knex("users")
        .insert({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          user_name: req.body.user_name,
          email: req.body.email,
          password: hashedPassword,
           })
        .then(() => {
          knex
            .select('id')
            .from('users')
            .where('user_name', req.body.user_name)
            .then((results) => {
            //   console.log("results 0", results[0]);
              req.session.user_id = results[0].id;
              knex("topics")
                .insert({user_id: req.session.user_id, title: 'First Wall'})
                .then(() => {
                  return res.redirect(`/users/${req.body.user_name}`);
                });
            });
        });
    });
    });



  // AFTER LOGIN NEED TO WORK ON CREATE NEW RESOURCE*****



  //login post!!!!
  router.post("/login", (req, res) => {
    console.log("logged in bud!", req.body.user_name);
  	const {user_name, password} = req.body;
  	knex
  	  .select("*")
  	  .from("users")
  	  // .where({'user_name': req.body.user_name})
  	  .then((rows) => {
        // console.log("what is result", rows);
              for (let i = 0; i < rows.length; i++) {
        if (user_name === rows[i].user_name && bcrypt.compareSync(password, rows[i].password) === true) {
          req.session.user_id = rows[i].id;
          console.log("MATCH");
          return res.redirect("/");
        }
      }
      return res.status(403).send("HTTP 403 - NOT FOUND: USERNAME OR PASSWORD INCORRECT!").end();


  	  });
  });
  return router;


}


