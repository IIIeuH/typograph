config = {
  port: 3000,
  url: 'mongodb://localhost:27017/typograph',
  session: {
    url: 'mongodb://localhost:27017/typograph',
    collection: 'sessions'
  }
};

module.exports = config;