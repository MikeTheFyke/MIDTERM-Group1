"use strict";

const express     = require('express');
const router      = express.Router();

module.exports = (knex) => {

//route for ajax request to fetch topics
  router.get("/retrieve_topic", (req,res) => {
  knex
  .select('*')
  .from('topics')
  .then((rows) => {
    return res.send(rows);
    });
  });


   // when user creates a topic
  router.post("/create_topic", (req, res) => {
    const {topic_name} = req.body;
    const {user_id} = req.session;
   console.log("PLEASEEEE");
    //error part
    if(!req.body) {
    res.status(400).json({ error: 'invalid request: no data in POST body'});
    return;
    }
    knex('topics')
          .insert({
          title: topic_name,
          user_id: user_id
           })
          .then(() =>{
            return res.redirect(`/users/${req.session.user_id}`);
          })
    })




return router;
}


