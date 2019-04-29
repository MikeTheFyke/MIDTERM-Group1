"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require("bcrypt");

//helper function
// function generateRandomString() {
//   return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
// }



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
              console.log("results 0", results[0]);
              req.session.user_id = results[0].id;

                  return res.redirect(`/users/${req.session.user_id}`);

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
  	  .then((rows) => {
              for (let i = 0; i < rows.length; i++) {
        if (user_name === rows[i].user_name && bcrypt.compareSync(password, rows[i].password) === true) {
          req.session.user_id = rows[i].id;

          return res.redirect(`/users/${req.session.user_id}`);

        }
      }
      return res.status(403).send("HTTP 403 - NOT FOUND: USERNAME OR PASSWORD INCORRECT!").end();


  	  });
  });

//update profile POST request// old POST request version
//   router.post("/:user_id/edit_profile", (req,res) => {
//     const {first_name,last_name,user_name, email, password} = req.body;
//   const hashedPassword = bcrypt.hashSync(password, 10);

//     knex
//       .select("*")
//       .from("users")
//       .then((rows) => {
//         knex('users')
//         .where({ id: req.session.user_id})
//         .update({
//                 first_name: first_name,
//                 last_name: last_name,
//                 user_name: user_name,
//                 email: email,
//                 password: hashedPassword
//                 })
//         .then(() => {
//           if(first_name && last_name && user_name && email && password) {
//           return res.redirect(`/users/${req.session.user_id}`);
//         } else {
//           return res.status(403).send(" All Fields Must Be Filled to Update Profile!").end();
//         }

//         })
//       });
// });

//this is the updated post request version
  router.post("/:user_id/edit_profile", (req,res) => {
    const {first_name,last_name,user_name, email, password} = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

    knex
      .select("*")
      .from("users")
      .then((rows) => {
          if(first_name && last_name && user_name && email && password) {

          knex('users')
        .where({ id: req.session.user_id})
        .update({
                first_name: first_name,
                last_name: last_name,
                user_name: user_name,
                email: email,
                password: hashedPassword
                })
        .then(()=> {
          return res.redirect(`/users/${req.session.user_id}`);

        })


        } else {
          return res.status(403).send(" All Fields Must Be Filled to Update Profile!").end();
        }
    })
});



  return router;


}

