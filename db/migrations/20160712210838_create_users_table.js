exports.up = function(knex, Promise) {
  return Promise.all([
  	//users
  	knex.schema.createTable('users', function(table){
  		table.increments();
  		table.string('first_name', 50);
  		table.string('last_name', 50);
  		table.string('user_name', 20);
  		table.string('email', 50);
  		table.string('password', 50);
  	}), 
  	knew.schema.createTable('resources', function(table){
  		table.increments();
  		// table.bigInteger('created_by').unsigned().index().references('id').inTable('users').onDelete('cascade');
  		table.string('url', 250);
  		table.string('title', 50);
  		table.string('description', 250);
  		table.integer('user_id').references('users.id');
  	})
  ])
}

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('users'),
		knex.schema.dropTable('resources')
	])
};


