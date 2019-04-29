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
    //THEN redirect to users profile

//toggle
    // knex
    //     .select('id')
    //     .from('topics')
    //     .where('title',topics_id)
    //       .then(function(result) {
    //         console.log("this is the result",result);
    //         const topics = result[0].id;
    //         knex.insert({
    //           title: title,
    //           description: description,
    //           url: url,
    //           topics_id: topics_id,
    //           user_id: user_id
    //           })



    //           .into('resources')
    //           .then(function(result){
    //           const id = result[0];
    //         }).asCallback(function(err){
    //             if (err) {
    //               res.status(500).json({ error: err.message });
    //             } else {
    //               res.redirect(`/main/${user_id}/`);
    //               // res.redirect("/main")
    //             }
    //           })
    //         })
            // })




//post request to create new resource ---still neeed it to connect foreign keys
//TOGGLE EXPERIMENT
  // router.post("/create_resource", (req, res) => {
  //   console.log("PLEASEEEEEEEE");
  //   const {title, description, url,topics_id} = req.body;
  //   const user_id = req.session.user_id;

  //   if(title && description && url && topics_id && user_id){
  //     knex("resources")
  //       .insert({
  //         title: title,
  //         description: description,
  //         url: url,
  //         topics_id: topics_id,
  //         user_id: user_id,
  //          })
  //       .then(() => {
  //         // knex
  //         //   .select('id')
  //         //   .from('users')
  //         //   .where('user_name', req.body.user_name)
  //         //   .then((results) => {
  //         //     console.log("results 0", results[0]);
  //             // req.session.user_id = results[0].id;

  //                 return res.redirect(`/users/${req.session.user_id}`);


  //   })
  //   }
  //   else {
  //     return res.status(400).send("Please fill out all fields!").end();
  //   }

  //   });





          return router;
          };





