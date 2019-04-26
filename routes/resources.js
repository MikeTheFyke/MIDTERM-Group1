"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require("bcrypt");
const url = require('url');


module.exports = (knex) => {

	//get resource
	router.get("/:id", (req, res) => {
      knex
        .select('resources.id','resources.url','resources.title','resources.description','users.user_name',

	})

	//create resource

	//update resource

	//delete resource

}
