"use strict";

const express = require('express');
const router  = express.Router();



 module.exports = (knex) => {
  // getting to new resource page
  router.get("/new_resource", (req,res )=> {
  const loggedUser = req.session.user_id;
  if(false) {
    res.redirect("/main");
  } else {
    // Promise.all ([

        knex.select('title').from('topics').where('user_id', 1)
      // ])
    .then(function(results) {
      console.log("results", results)

      const cookie = results[0][0];
      const topics = results[1];
      // const templateVars = {
      //   id: req.session.user_id,
      //   user_name: cookie.user_name,
      //   topics: topics
      // }
      res.render("new_resource");
      })
    }
  })
  return router;
}


