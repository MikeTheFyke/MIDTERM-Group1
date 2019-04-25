exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          id: 1,
          first_name: 'Johnny',
          last_name: 'Walker',
          user_name: 'singlemalt',
          email:  'hangover@gmail.com',
          password:  '123',
        }),
        knex('users').insert({
          id: 2,
          first_name: 'Lady',
          last_name: 'Gaga',
          user_name: 'meatsuit',
          email:  'pokerface@gmail.com',
          password:  '543',
        }),
        knex('users').insert({
          id: 3,
          first_name: 'Bill',
          last_name: 'Murray',
          user_name: 'ghostbuster',
          email: 'lostintokyo@gmail.com',
          password:  '1111',
        }),

        knex('topics').insert({
          id: 1,
          description: 'food'
        }),
        knex('topics').insert({
          id: 2,
          description: 'music'
        }),
        knex('topics').insert({
          id: 3,
          description: 'movies'
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
          url: 'http://www.lcbo.com/',
          title: 'Lickbo',
          description: 'Only for fun adults',

        }),
        knex('resources').insert({
          user_id: 2,
          url: 'https://en.wikipedia.org/wiki/Lady_Gaga',
          title: 'Goo Goo GaGa',
          description: 'Great music Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula',

        }),
        knex('resources').insert({
          user_id: 3,
          url: 'https://www.fillmurray.com/',
          title: 'Bill Murray filler',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. ',

        }),

        knex('comments').insert({
          id: 1,
          user_id: 1,
          text: 'Great dude! adipiscing elit. Aenean commodo ligula eget dolor. .',
          resource_id: 2
        }),
        knex('comments').insert({
          id: 2,
          user_id: 2,
          text: ':( Meh,ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. C',
          resource_id: 3
        }),
        knex('comments').insert({
          id: 3,
          user_id: 3,
          text: 'Hipster ispsum ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenea',
          resource_id: 1
        }),


      ]);
    });
};
