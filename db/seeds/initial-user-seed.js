exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          id: 1,
          first_name: 'Alice',
          last_name: 'Wonderland',
          user_name: 'whiterabbit',
          email:  'whiterabbit@email.com',
          password:  '12345',
          // avatar:  'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        }),
        knex('users').insert({
          id: 2,
          first_name: 'Bob',
          last_name: 'Marley',
          user_name: 'chillvibes',
          email:  'chillvibes@email.com',
          password:  '12345',
          // avatar:  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
        }),
        knex('users').insert({
          id: 3,
          first_name: 'Charlie',
          last_name: 'Chocolate',
          user_name: 'willywonka',
          email: 'willywonka@email.com',
          password:  '12345',
          // avatar:  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9PqvCqAfsJNWTHMLdwQ0zEKv2ZikLR419IEJssoX7ZrkV4pNP'
        }),

        knex('category').insert({
          id: 1,
          description: 'food'
        }),
        knex('category').insert({
          id: 2,
          description: 'music'
        }),
        knex('category').insert({
          id: 3,
          description: 'porn'
        }),

        knex('ratings').insert({
          id: 1,
          rate: 0
        }),
        knex('ratings').insert({
          id: 2,
          rate: 1
        }),
        knex('ratings').insert({
          id: 3,
          rate: 2
        }),
        knex('ratings').insert({
          id: 4,
          rate: 3
        }),
        knex('ratings').insert({
          id: 5,
          rate: 4
        }),
        knex('ratings').insert({
          id: 6,
          rate: 5
        }),

        knex('resources').insert({
          user_id: 1,
          url: 'http://www.alice-in-wonderland.net/',
          title: 'Wonderland',
          description: 'Good for kids and adults',

        }),
        knex('resources').insert({
          user_id: 2,
          url: 'https://en.wikipedia.org/wiki/Bob_Marley',
          title: 'Music',
          description: 'Great music Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula',

        }),
        knex('resources').insert({
          user_id: 3,
          url: 'https://en.wikipedia.org/wiki/Willy_Wonka',
          title: 'Willy Wonka Info',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. ',
          // created_on: '2013-05-23',
          // created_by: 3,
          // category_id: 1
        }),

      ]);
    });
};
