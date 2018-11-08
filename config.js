config = {
  port: 3000 + (+process.env.NODE_APP_INSTANCE || 0),
  url: 'mongodb://localhost:27017/typograph',
  session: {
    url: 'mongodb://localhost:27017/typograph',
    collection: 'sessions'
  }
};

module.exports = config;