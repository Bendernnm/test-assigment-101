const mongodb = require('mongodb');

const config = require('../config');

const connectionDefaultOpts = Object.freeze({
  poolSize          : 50,
  wtimeout          : 5000,
  useNewUrlParser   : true,
  useUnifiedTopology: true,
  w                 : 'majority',
});

class MongoDBClient {
  constructor() {
    this._db = null;
  }

  get db() {
    return this._db;
  }

  async connect(opts = connectionDefaultOpts) {
    const client = new mongodb.MongoClient(config.MONGODB_URL, opts);

    await client.connect();

    this._db = client.db(config.MONGODB_NAME);

    return this;
  }

  bootstrap(opts) {
    return this.connect(opts);
  }
}

module.exports = new MongoDBClient();
