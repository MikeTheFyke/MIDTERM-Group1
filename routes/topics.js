"use strict";

const express     = require('express');
const router      = express.Router();

module.exports = (knex) => {

  // create topic
  router.post("/", (req, res) => {
    knex('topics').max('id')
      .then(result => result[0].max + 1)
      .then( max => {
        const newTopics = {
            id: max,
            title: req.body.title
          };

        knex("topics")
          .insert(newTopics)
          .then(results =>  res.json(newTopics));
      })
      .catch(error => res.status(400).json( {error} ));
  });

  // update topic
  router.put("/:id", (req, res) => {
    const updateTopics = {
            id: req.params.id,
            title req.body.title
          };

    knex("topics")
      .where('id', req.params.id)
      .update({
        description: req.body.title
      })
      .then(result => {
        if(result === 1){ return res.status(200).json( updateTopics ); }
      })
      .catch(error => res.status(400).json( {error} ));
  });

  // delete topic
  router.delete("/:id", (req, res) => {
    knex("topics")
      .where('id', req.params.id)
      .del()
      .then(result => {
        if(result === 1){ return res.status(200).json( {success: 'Deleted' }); }
      })
      .catch(error => res.status(400).json( {error} ));
  });

  // get topic
  router.get("/:id", (req, res) => {
  }


  return router;
}