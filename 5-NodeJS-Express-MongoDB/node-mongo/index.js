const MongoClient = require('mongodb').MongoClient
const dboper = require('./operations')
const url = 'mongodb://localhost:27017/'
const dbname = 'nucampsite'

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('connected to db server')
    const db = client.db(dbname)

    db.dropCollection('campsites')
      .then(result => {
        console.log('dropped collection', result)

        return dboper.insertDocument(
          db,
          { name: 'breadcrumb trail campground', description: 'test' },
          'campsites'
        )
      })
      .then(result => {
        console.log('insert document: ', result.ops)

        return dboper.findDocuments(db, 'campsites')
      })
      .then(docs => {
        console.log('found docs: ', docs)

        return dboper.updateDocument(
          db,
          { name: 'breadcrumb trail campground' },
          { description: 'updated test description' },
          'campsites'
        )
      })
      .then(result => {
        console.log('updated document count: ', result.result.nModified)

        return dboper.findDocuments(db, 'campsites').then(docs => {
          console.log('found documents: ', docs)

          return dboper
            .removeDocument(
              db,
              { name: 'breadcrumb trail campground' },
              'campsites'
            )
            .then(result => {
              console.log('deleted document count: ', result.deletedCount)
              return client.close()
            })
            .catch(err => {
              console.log(err)
              client.close()
            })
        })
      })
  })
  .catch(err => {
    console.log(err)
  })
