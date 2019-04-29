"use strict";

const express = require('express');
const router  = express.Router();



 module.exports = (knex) => {

  //creating a new resource//

  router.post("/create_resource", function (req, res) {
    if (!req.body) {
    res.status(400).json({ error: 'invalid request: no data in POST body'});
    return;
    }
    console.log("its hitting the create resource post route");
    const {url, title, description, topics_id} = req.body;
    const user_id = req.session.user_id;

    //insert above data into resources table
    knex('resources')
        .insert({
          url: url,
          title: title,
          description: description,
          topics_id: topics_id,
          user_id: user_id
        })
        .then(()=> {
           res.redirect(`/users/${user_id}/`);
        })
  })

//route for ajax request to fetch resources
  router.get("/retrieve_resource", (req,res) => {
  knex
  .select('*')
  .from('resources')
  .then((rows) => {
    return res.send(rows);
    });
  });



return router;
};





