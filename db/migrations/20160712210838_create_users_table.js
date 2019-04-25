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
      knex.schema.createTable('resources', function(table){
         table.increments();
         table.string('url', 250);
         table.string('title', 50);
         table.string('description', 250);
         table.integer('user_id').references('users.id').onDelete('cascade');
     }),

      knex.schema.createTable('topics', function(table){
         table.increments();
         table.string('title', 50);
         table.integer('user_id').references('users.id').onDelete('cascade');
     }),

      knex.schema.createTable('comments', function(table){
         table.increments();
         table.string('text', 500);
         table.integer('user_id').references('users.id').onDelete('cascade');
     }),
      knex.schema.createTable('ratings', function(table){
         table.increments();
         table.string('rate');
         table.integer('user_id').references('users.id').onDelete('cascade');
         table.integer('resources_id').references('resources.id').onDelete('cascade');
     }),

      knex.schema.createTable('category', function(table){
         table.increments();
         table.string('description', 50);

     }),

      knex.schema.createTable('topics_resources', function(table){
         table.increments();
         table.integer('resources_id').references('resources.id').onDelete('cascade');
         table.integer('topics_id').references('topics.id').onDelete('cascade');
     })


 ])
}

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('category'),
        knex.schema.dropTable('topics_resources'),
        knex.schema.dropTable('ratings'),
        knex.schema.dropTable('comments'),
        knex.schema.dropTable('resources'),
        knex.schema.dropTable('topics'),

        knex.schema.dropTable('users')

    ])
};
