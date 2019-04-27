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

  router.post("/new_resource", function (req, res) {
    console.log("tryna post");
    if (!req.body) {
    res.status(400).json({ error: 'invalid request: no data in POST body'});
    return;
    }
    // console.log("req.body is", req.body );
    const {title, description, url, resource_topic} = req.body;
    const user_id = req.session.user_id;
            console.log("req.session", req.session);


    // knex.select('id').from('topics').where('title',req.body.resource_topic)
    //       .then(function(result) {
    //         console.log("this is the result",result);
    //         const topics = result[0].id;
            //answer topics value should be 3
            // console.log("user_id", user_id);
            knex.insert({
              user_id:user_id,
              url:url,
              title:title,
              description:description})
              // .returning('id')
              .into('resources')
              .then(function(result){
              const id = result[0];
            }).asCallback(function(err){
                if (err) {
                  res.status(500).json({ error: err.message });
                } else {
                  // res.redirect(`/main/${user_id}/`);
                  res.redirect("/main")
                }
              })
            })
          return router;
          };








