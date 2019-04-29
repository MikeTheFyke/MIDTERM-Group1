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

  //creating a new resource//

  router.post("/:user_id/create_resource", function (req, res) {
    console.log("tryna post");
    if (!req.body) {
    res.status(400).json({ error: 'invalid request: no data in POST body'});
    return;
    }
    // console.log("req.body is", req.body );
    const {title, description, url,topics_id} = req.body;
    const user_id = req.session.user_id;


    knex.select('id').from('topics').where('title',topics_id)
          .then(function(result) {
            console.log("this is the result",result);
            const topics = result[0].id;
            knex.insert({
              title: title,
              description: description,
              url: url,
              topics_id: topics_id,
              user_id: user_id
              })



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
            })




//post request to create new resource ---still neeed it to connect foreign keys

  router.post("/:user_id/create_resource", (req, res) => {
    // console.log("tryna post a new resource");
    const {title, description, url,topics_id} = req.body;
    const user_id = req.session.user_id;

    if(title && description && url && topics_id && user_id){
      knex("resources")
        .insert({
          title: title,
          description: description,
          url: url,
          topics_id: topics_id,
          user_id: user_id,
           })
        .then(() => {
          // knex
          //   .select('id')
          //   .from('users')
          //   .where('user_name', req.body.user_name)
          //   .then((results) => {
          //     console.log("results 0", results[0]);
              // req.session.user_id = results[0].id;

                  return res.redirect(`/users/${req.session.user_id}`);


    })
    }
    else {
      return res.status(400).send("Please fill out all fields!").end();
    }

    });





          return router;
          };





