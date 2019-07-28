const { MongoClient, ObjectID } = require("mongodb");

const env = require("../env");

class MongoService {
  constructor() {
    this.client = new MongoClient(env.MONGO_URL, {
      useNewUrlParser: true,
      authSource: env.MONGO_DATABASE,
      // Commented to enable local mongoDB authentication
      // auth: {
      //   user: env.MONGO_USER,
      //   password: env.MONGO_PASSWORD,
      // },
      poolSize: env.MONGO_CONNECTION_POOL_SIZE,
    });

    this.isConnecting = false;
  }

  async getDb() {
    await this.getConnection();
    var db = this.client.db(env.MONGO_DATABASE);
    return db;
  }

  async getConnection() {
    if (this.isConnecting) {
      await this.waitForConnection();
    }

    if (!this.isClientConnected) {
      this.isConnecting = true;
      await this.client.connect();
      this.isConnecting = false;
    }
  }

  async closeConnection() {
    if (this.isClientConnected) {
      await this.client.close();
    }
  }

  get isClientConnected() {
    return this.client.isConnected();
  }

  // If our mongo connection drops, wait for it to be re-established before processing more queries
  waitForConnection() {
    return new Promise(resolve => {
      var checkConnected = () => {
        if (this.isClientConnected) {
          resolve();
        } else {
          setTimeout(() => checkConnected(resolve), 100);
        }
      };

      checkConnected();
    });
  }
}

function convertStringToID(idStr) {
  return new ObjectID(idStr);
}

module.exports = {
  mongoConnector: new MongoService(),
  convertStringToID,
};
