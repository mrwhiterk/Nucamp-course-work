const MongoClient = require('mongodb').MongoClient
const assert = require('assert').strict
const dboper = require('./operations')
const url = 'mongodb://localhost:27017/'
const dbname = 'nucampsite'

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  assert.strictEqual(err, null)

  console.log('connected to db server')

  const db = client.db(dbname)

  db.dropCollection('campsites', (err, result) => {
    assert.strictEqual(err, null)
    console.log('dropped collection', result)

    dboper.insertDocument(
      db,
      { name: 'breadcrumb trail campground', description: 'test' },
      'campsites',
      result => {
        console.log('insert document: ', result.ops)

        dboper.findDocuments(db, 'campsites', docs => {
          console.log('found docs: ', docs)

          dboper.updateDocument(
            db,
            { name: 'breadcrumb trail campground' },
            { description: 'updated test description' },
            'campsites',
            result => {
              console.log('updated document count: ', result.result.nModified)
              dboper.findDocuments(db, 'campsites', docs => {
                console.log('found documents: ', docs)

                dboper.removeDocument(
                  db,
                  { name: 'breadcrumb trail campground' },
                  'campsites',
                  result => {
                    console.log('deleted document count: ', result.deletedCount)
                    client.close()
                  }
                )
              })
            }
          )
        })
      }
    )
  })
})
