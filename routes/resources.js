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

    if (!req.body) {
    res.status(400).json({ error: 'invalid request: no data in POST body'});
    return;
    }
    const {title, description, url} = req.body;
    const user_id = req.session.user_id;
    knex.select('id').from('boards').where('title',req.body.link_board)
          .then(function(result) {
            const board = result[0].id;
            knex.insert({user_id:userid, topic_id:topic, url:url, title:title,
              description:desc, create_date:knex.fn.now(), color:color}).returning('id')
              .into('links').then(function(result){
              const id = result[0];
              knex.insert({link_id: id, userid: userid}).into('learnt_counters').then((result)=>{
                return knex.insert({link_id: id, board_id: board}).into('boards_links');
            }).asCallback(function(err){
                if (err) {
                  res.status(500).json({ error: err.message });
                } else {
                  res.redirect(`/links/${id}/`);
                }
              })
            })
          })
      })
});

 // let foundUser = undefined;
 //  for(let i = 0; i < Object.keys(users).length; i++){
 //   if((req.body.email == users[Object.keys(users)[i]]['email'])){
 //    foundUser = users[Object.keys(users)[i]];
 //   }
  // }
  if(!foundUser){
    res.status(403)
    .send('email does not exist')
  }else if(foundUser && bcrypt.compareSync(req.body.password, foundUser.password)){
    req.session.user_id = foundUser['id'];
    res.redirect('/urls');
  }else{
    res.status(403)
    .send('password does not match');
  }
})
  return router;
}


