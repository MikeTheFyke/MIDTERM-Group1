"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
//get specific ratings
  router.get("/:user_id", (req, res) => {
    knex
      .select("*")
      .from("ratings")
      .where({user_id: req.params.user_id})
      .then(results => res.json(results[0]))
      .catch(e => res.status(400).json( {e} ));
  });
//get general ratings
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("ratings")
      .then(results => res.json(results))
      .catch(e => res.status(400).json( {e} ));
  });
//input ratings

//maybe delete ratings??

  return router;
}