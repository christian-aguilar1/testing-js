const request = require('supertest');
const { MongoClient } = require('mongodb');

const createApp = require('../src/app');
const { config } = require('../src/config');

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;

describe('Test for books', () => {
  let app = null;
  let server = null;
  let db = null;
  beforeAll(async () => {
    app = createApp();
    server = app.listen(3002);
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    db = client.db(DB_NAME);
  });

  afterAll(async () => {
    await server.close();
    await db.dropDatabase();
  });

  describe('test for [GET] /api/v1/books', () => {
    test('should return a list books', async () => {
      // arrange
      const seedData = await db.collection('books').insertMany([
        {
          name: 'Book1',
          year: 1998,
          author: "Nicolas de'Benedetto",
        },
        {
          name: 'Book2',
          year: 2005,
          author: "Nicolas de'Benedetto",
        },
      ]);
      console.log(seedData);
      // act
      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          // assert
          expect(body.length).toEqual(seedData.insertedCount);
        });
    });
  });
});
