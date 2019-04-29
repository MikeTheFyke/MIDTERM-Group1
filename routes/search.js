"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //creating a new resource//

// Route rendering the search page once a search is submitted
  router.get('/', (req, res) => {
    if (req.session.user_id) {
    knex
      .select('*')
      .from('users')
      .where('id', req.session.user_id)
      .then((rows) => {
        let templateVars = {user_name: rows[0].user_name};
        return res.render('search_page', templateVars);
      });
    } else {
      let templateVars = { user_name: false };
      return res.render('search', templateVars);
    }
});
//ajax route fro getting search results//
   router.get('/:searchQuery', (req, res) => {
    let searches = req.params.searchQuery;
    knex
      .select('resources.id', 'title')
      .from('resources')
      //need to confirm this join!!!!
      .join('topics', {'topics.id' : 'resources.topics_id'})
      .where('title', 'LIKE', `%${searches}%`)
      .orWhere('description', 'LIKE', `%${searches}%`)
      .then((rows) => {
        res.json(rows);
      });
  });

return router;
};
