"use strict";

const express = require('express');
const router  = express.Router();



 module.exports = (knex) => {
  // getting to new resource page
  resourceRoute.get("/new_resource")
  const loggedUser = req.session.user_id;
  if(!loggedUser) {
    res.redirect("/main");
  } else {
    Promise.all ([
      knex
        .select('*')
        .from('users')
        .where('id',req.session.user_id),
        knex.select('title').from('topics').where('user_id', loggedUser)
      ])
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
  }


