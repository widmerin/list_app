const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  return client.query(q.Paginate(q.Match(q.Ref("indexes/get_tasks"))))
    .then((response) => {
      const refs = response.data
      const getAllDataQuery = refs.map((ref) => {
        return q.Get(ref)
      })
      return client.query(getAllDataQuery).then((res) => {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(res)
        })
      })
    }).catch((error) => {
      console.log(error)
    })
}
