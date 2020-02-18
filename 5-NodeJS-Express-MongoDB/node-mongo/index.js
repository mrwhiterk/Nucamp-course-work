const MongoClient = require('mongodb').MongoClient
const assert = require('assert').strict
const url = 'mongodb://localhost:27017/'
const dbname = 'nucampsite'

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  assert.strictEqual(err, null)

  console.log('connected to db server')

  const db = client.db(dbname)

  db.dropCollection('campsites', (err, result) => {
    assert.strictEqual(err, null)

    console.log('dropped collection', result)

    const collection = db.collection('campsites')

    collection.insertOne(
      { name: 'breadcrumb trail camp', description: 'test' },
      (err, result) => {
        assert.strictEqual(err, null)
        console.log('insert document: ', result.ops)

        collection.find().toArray((err, docs) => {
          assert.strictEqual(err, null)
          console.log('found documents: ', docs)

          client.close()
        })
      }
    )
  })
})
