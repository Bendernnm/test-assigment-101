const mockMongodbClient = {
  db       : {
    collection: () => mockMongodbClient,
  },
  aggregate: () => mockMongodbClient,
  toArray  : jest.fn(),
};

module.exports = mockMongodbClient;
