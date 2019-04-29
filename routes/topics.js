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

          //toggle back if approach doesn't work
          // .then(() => {
          //   console.log("milestone");
          // knex
          //   .select('*')
          //   .from('topics')
          //   .where('user_id', user_id)
          //   .then((results) => {
          //     console.log("we are expecting values from topics", results[0]);
          //     // user_id = results[0].user_id;

          //         return res.redirect(`/users/${req.session.user_id}`);
          //   });
          // })

  // knex.select('*').from('topics')
  //   .then(function() {
  //     knex.insert({
  //       user_id:user_id,
  //       title:topic_name })
  //     .returning('*')
  //       .into('topics').then(function(result) {
  //     })
  //   })

  // res.redirect(`/users/${user_id}`);
})



return router;
}

