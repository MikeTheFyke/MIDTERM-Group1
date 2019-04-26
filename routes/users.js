"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require("bcrypt");

//helper function
function generateRandomString() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}



module.exports = (knex) => {

 // when user registers
  router.post("/register", (req, res) => {
  	let id = 0;
  	const {first_name, last_name, user_name, email, password} = req.body;

  if (first_name === "" || last_name === "" || user_=== ""|| email === "" || password === "" ) {
   return res.status(400).send({ 
   	error: "Incomplete form submitted. Please check fields and try again." 
   })
  }
  if(password.length < 10){
  	return res.status(400).send({ error: "Password must be at least 10 characters long"})
  }
  knex
    .select("*")
    .from("users")
    .where("user_name", username)
    .orWhere("email", email)
    .then( (result) => {
    	if(result.length === 0) {
    	knex('users')
    	.max('id')
        .then((results) => {
    	  id = results[0].max + 1;
  	  	  const userID = generateRandomString();
  	  	  const userInfoArray = [{id: userID, first_name: first_name, last_name: last_name, password: bcrypt.hashSync(password, 10), user_name: user_name, email: email}]

  	  	  knex("users")
  	  	    .insert(userInfoArray)
  	  	    .then(() => {
  	  	  	// tokenUserID = req.session.user_id;
  	  	  	// return res.status(200).send({id, first_name, last_name, username, email, avatar});
  	  	    })
  	  	    .catch((err) => {
  	  	  	  console.log("userInfoArray doesn't insert inside users table"); throw err });
  	  	    });
  	  	} else {
  	  		if(result[0].username === username) {
  	  			return res.status(200).send({id, first_name, last_name,user_name, email});
  	  		}
  	  		else if (result[0].email === email) {
  	  			return res.status(400).send({ error: "Email already taken. Please enter new email and try again." })
  	  		}
  	  		else{
  	  			return res.status(400).send({ error: `Bad Request: ${req}` })
  	  		}
  	    }
    });
  });
  //login not finished!!!!
  router.put("/login", (req, res) => {
  	const {user_name, password} = req.body;
  	knex
  	  .select(*)
  	  .from("users")
  	  .where('user_name', user_name) 	  
  	  .then((targetUser) => {
  	  	if(!targetUser){
  	  		return res.status(400).send({ error: "User doesn't exist"})
  	  	}
  	  	// console.log(targetUser[0]);
  	  	else if (password === targetUser[0].password){
  	  		//learning authentication on Friday
  	  		knex("users")
  	  		  .where('user_name', user_name)
  	  		  .
  	  	}

  	  })
  })

  router.post("/logout", (req, res) => {

  })


app.post('/login', function (req, res) {
 let foundUser = undefined;
  for(let i = 0; i < Object.keys(users).length; i++){
   if((req.body.email == users[Object.keys(users)[i]]['email'])){
    foundUser = users[Object.keys(users)[i]];
   }
  }
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
  

//get users topics
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });



  return router;
}


