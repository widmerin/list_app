const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

function getId(urlPath) {
  return urlPath.match(/([^\/]*)\/*$/)[0]
}


exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const id = getId(event.path)
  return client.query(q.Create(q.Ref(`collections/tasks`), {data}))
  .then((response) => {
    console.log("success", response)
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }).catch((error) => {
    console.log(error)
  })
}
