const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  console.log("Function `get-lists` invoked")
  return client.query(q.Paginate(q.Match(q.Ref("indexes/get_lists"))))
    .then((response) => {
      const recipeRefs = response.data
      console.log("Lists refs", recipeRefs)
      console.log(`${recipeRefs.length} lists found`)
      const getAllRecipeDataQuery = recipeRefs.map((ref) => {
        return q.Get(ref)
      })
      return client.query(getAllRecipeDataQuery).then((ret) => {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(ret)
        })
      })
    }).catch((error) => {
      console.log(error)
    })
}
