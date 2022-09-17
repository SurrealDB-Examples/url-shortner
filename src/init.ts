const Surreal = require('surrealdb.js')
const db = new Surreal('http://127.0.0.1:8000/rpc')

async function init(options: {
  user: string
  pass: string
  ns: string
  db: string
}) {
  await db.signin({
    user: options.user,
    pass: options.pass,
  })
  await db.use(options.ns, options.db)
  return db
}

export { db, init }
