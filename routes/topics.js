"use strict";

const express     = require('express');
const router      = express.Router();

module.exports = (knex) => {

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

