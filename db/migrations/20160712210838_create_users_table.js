exports.up = function(knex, Promise) {
return Promise.all([
    //users
    knex.schema.createTable('users', function(table){
        table.increments();
        table.string('first_name', 50);
        table.string('last_name', 50);
        table.string('user_name', 50);
        table.string('email', 200);
        table.string('password');
        //add token sessionID column ,very IMPORTANT!!!//
    }),



     knex.schema.createTable('ratings', function(table){
        table.increments();
        table.string('rate');
        table.integer('user_id').references('users.id').onDelete('cascade');
        table.integer('resource_id').references('resources.id').onDelete('cascade');
    }),

     knex.schema.createTable('topics', function(table){
        table.increments();
        table.string('title', 50);
        table.integer('user_id').references('users.id').onDelete('cascade');
        table.integer('resource_id').references('resources.id').onDelete('cascade');
     }),

       knex.schema.createTable('resources', function(table){
        table.increments();
        table.string('url', 250);
        table.string('title', 50);
        table.string('description', 250);
        table.integer('user_id').references('users.id').onDelete('cascade');
    }),
       knex.schema.createTable('comments', function(table){
        table.increments();
        table.string('text', 500);
        table.integer('user_id').references('users.id').onDelete('cascade');
        table.integer('resource_id').references('id').inTable('resources').onDelete('cascade');

    }),

     knex.schema.createTable('resources_info', function(table){
        table.increments();
        table.integer('topics_id').unsigned().index().references('topics.id').onDelete('cascade');
        table.integer('resource_id').unsigned().index().references('resources.id').onDelete('cascade');
        table.integer('user_id').unsigned().index().references('users.id').onDelete('cascade');
        table.integer('rating_id').unsigned().index().references('ratings.id').onDelete('cascade');
        table.boolean('liked');
    })


])
}

exports.down = function(knex, Promise) {
   return Promise.all([

       knex.schema.dropTable('resources_info'),
       knex.schema.dropTable('comments'),
       knex.schema.dropTable('topics'),
       knex.schema.dropTable('ratings'),
       knex.schema.dropTable('resources'),
       knex.schema.dropTable('users')






   ])
};
