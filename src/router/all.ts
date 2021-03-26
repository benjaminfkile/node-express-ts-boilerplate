import createConnectionPool, {sql} from '@databases/pg';
const { DATABASE_URL } = require('../config')
const db = createConnectionPool(DATABASE_URL);
const expressLightRouter = require('express')
const allRouter = expressLightRouter.Router()

allRouter
  .route('/')
  .get((req:any, res:any, next:any) => {

   async function run() {
        const results = await db.query(sql`SELECT * from lights;`);
        res.json(results)
    }

    run().catch((err) => {
        // process.exit(1);
        res.send('oop')
    });
})
  


module.exports = allRouter