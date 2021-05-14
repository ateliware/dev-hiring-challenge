module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('programming_languages', [
    {
      github_login: 'nodejs',
      name: 'Node.js',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      github_login: 'ruby',
      name: 'The Ruby Programming Language',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      github_login: 'Kotlin',
      name: 'Kotlin',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      github_login: 'javaee',
      name: 'Java EE',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      github_login: 'swift',
      name: 'Swift',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]),
};
